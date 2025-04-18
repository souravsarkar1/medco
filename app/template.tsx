import { ReduxProvider } from "@/lib/redux/provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}