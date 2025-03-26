'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import router from 'next/dist/client/router';
// Zod validation schema
const userDataSchema = z.object({
    dateOfBirth: z.date().optional(),
    gender: z.enum(['Male', 'Female', 'Other']),
    chronicConditions: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    currentMedications: z.array(
        z.object({
            name: z.string().min(1, "Medication name is required"),
            dosage: z.string().optional(),
            frequency: z.string().optional()
        })
    ).optional(),
    familyMedicalHistory: z.array(
        z.object({
            relation: z.string().min(1, "Relation is required"),
            condition: z.string().min(1, "Condition is required")
        })
    ).optional()
});

const UserDataCollectPage = () => {
    const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '' }]);
    const [familyHistory, setFamilyHistory] = useState([{ relation: '', condition: '' }]);
    const router = useRouter();
    // Initialize the form
    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        defaultValues: {
            gender: undefined,
            chronicConditions: [],
            allergies: [],
        }
    });

    // Submit handler
    const onSubmit = async (data: z.infer<typeof userDataSchema>) => {
        try {
            // Get the token from localStorage or your auth context
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token not found');
                return;
            }

            const response = await fetch('/api/auth/user-details', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    personalInfo: {
                        dateOfBirth: data.dateOfBirth,
                        gender: data.gender
                    },
                    medicalHistory: {
                        chronicConditions: data.chronicConditions,
                        allergies: data.allergies,
                        currentMedications: data.currentMedications,
                        familyMedicalHistory: data.familyMedicalHistory
                    }
                })
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                toast.success("Profile has been successfully updated.");
                // Redirect or next steps
            } else {
                toast.error(result.error || "Failed to update profile");
            }
            if (result?.stepsCompleted === 2) {
                router.push("/");
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error("Unable to connect to the server");
        }
    };

    // Add medication field
    const addMedicationField = () => {
        setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
    };

    // Add family history field
    const addFamilyHistoryField = () => {
        setFamilyHistory([...familyHistory, { relation: '', condition: '' }]);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl mt-20 mb-20 bg-[#000] rounded-lg shadow-md">
            <div className="flex items-center justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold">Complete Your Profile</h1>
                <Button><X className="h-4 w-4" /> Skip For Now</Button>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription className="text-xs">
                                        Your date of birth helps us provide personalized care.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select your gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-xs">
                                        Select the gender that best describes you.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Chronic Conditions */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="chronicConditions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chronic Conditions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="List any chronic conditions, separated by commas"
                                            onChange={(e) => {
                                                const conditions = e.target.value.split(',').map(c => c.trim());
                                                field.onChange(conditions);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Comma-separate multiple conditions
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Allergies */}
                        <FormField
                            control={form.control}
                            name="allergies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allergies</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="List any allergies, separated by commas"
                                            onChange={(e) => {
                                                const allergies = e.target.value.split(',').map(a => a.trim());
                                                field.onChange(allergies);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Comma-separate multiple allergies
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Medications */}
                    <div>
                        <FormLabel className="mb-2">Current Medications</FormLabel>
                        {medications.map((med, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                                <Input
                                    placeholder="Medication Name"
                                    value={med.name}
                                    onChange={(e) => {
                                        const newMeds = [...medications];
                                        newMeds[index].name = e.target.value;
                                        setMedications(newMeds);
                                        form.setValue('currentMedications', newMeds);
                                    }}
                                />
                                <Input
                                    placeholder="Dosage"
                                    value={med.dosage}
                                    onChange={(e) => {
                                        const newMeds = [...medications];
                                        newMeds[index].dosage = e.target.value;
                                        setMedications(newMeds);
                                        form.setValue('currentMedications', newMeds);
                                    }}
                                />
                                <Input
                                    placeholder="Frequency"
                                    value={med.frequency}
                                    onChange={(e) => {
                                        const newMeds = [...medications];
                                        newMeds[index].frequency = e.target.value;
                                        setMedications(newMeds);
                                        form.setValue('currentMedications', newMeds);
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addMedicationField}
                            className="mt-2 bg-green-500 text-white hover:bg-green-600"
                        >
                            Add Medication
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                if (medications.length > 1) {
                                    setMedications(medications.slice(0, -1));
                                    form.setValue('currentMedications', medications.slice(0, -1));
                                }
                                else {
                                    toast.error("At least one medication is required");
                                }
                            }}
                            className="mt-2 bg-red-500 text-white hover:bg-red-600 ml-2"
                        >
                            Remove Medication
                        </Button>
                    </div>

                    {/* Family Medical History */}
                    <div>
                        <FormLabel className="mb-2">Family Medical History</FormLabel>
                        {familyHistory.map((history, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                <Input
                                    placeholder="Relation"
                                    value={history.relation}
                                    onChange={(e) => {
                                        const newHistory = [...familyHistory];
                                        newHistory[index].relation = e.target.value;
                                        setFamilyHistory(newHistory);
                                        form.setValue('familyMedicalHistory', newHistory);
                                    }}
                                />
                                <Input
                                    placeholder="Condition"
                                    value={history.condition}
                                    onChange={(e) => {
                                        const newHistory = [...familyHistory];
                                        newHistory[index].condition = e.target.value;
                                        setFamilyHistory(newHistory);
                                        form.setValue('familyMedicalHistory', newHistory);
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addFamilyHistoryField}
                            className="mt-2 bg-green-500 text-white hover:bg-green-600"
                        >
                            Add Family History
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                if (familyHistory.length > 1) {
                                    setFamilyHistory(familyHistory.slice(0, -1));
                                    form.setValue('familyMedicalHistory', familyHistory.slice(0, -1));
                                }
                                else {
                                    toast.error("At least one family history is required");
                                }
                            }}
                            className="mt-2 bg-red-500 text-white hover:bg-red-600 ml-2"
                        >
                            Remove Family History
                        </Button>
                    </div>

                    <Button type="submit" className="w-full">
                        Save Profile
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default UserDataCollectPage;