"use client";

import { useState } from "react";
import { User, Mail, Lock, Camera, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function EditProfilePage() {
    const [profile, setProfile] = useState({
        username: "johndoe",
        email: "john.doe@example.com",
        fullName: "John Doe",
        bio: "Software Developer | Tech Enthusiast",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        avatarUrl: "/api/placeholder/200/200"
    });

    const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarUrl);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        // Implement save logic here
        console.log("Profile updated:", profile);
        // You would typically call an API to save the profile
    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-4">
                        <User className="h-8 w-8 text-primary" />
                        <span>Edit Profile</span>
                    </CardTitle>
                    <CardDescription>
                        Update your personal information and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        {/* Avatar Section */}
                        <div className="flex items-center space-x-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={selectedAvatar} alt="Profile Picture" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Camera className="mr-2 h-4 w-4" /> Change Photo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Profile Picture</DialogTitle>
                                        <DialogDescription>
                                            Select a new profile picture
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <img
                                                key={num}
                                                src={`/api/placeholder/200/200?random=${num}`}
                                                alt={`Avatar ${num}`}
                                                className={`cursor-pointer rounded-md hover:opacity-75 ${selectedAvatar === `/api/placeholder/200/200?random=${num}`
                                                    ? 'border-2 border-primary'
                                                    : ''
                                                    }`}
                                                onClick={() => setSelectedAvatar(`/api/placeholder/200/200?random=${num}`)}
                                            />
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Profile Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <Input
                                        id="username"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Bio and Website */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-800"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="website">Website</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <Input
                                        id="website"
                                        name="website"
                                        value={profile.website}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline">
                                <X className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button onClick={handleSaveProfile}>
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}