import { BiShoppingBag, BiUser } from "react-icons/bi";
import { LuBriefcase } from "react-icons/lu";
import { BiBookOpen } from "react-icons/bi";
import { BsHeartPulse } from "react-icons/bs";


export const categories = [
    {
        category: "Personal",
        icon: BiUser,
        color: "#8B5CF6",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        category: "Work",
        icon: LuBriefcase,
        color: "#3B82F6",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        category: "Study",
        icon: BiBookOpen,
        color: "#F59E0B",
        gradient: "from-amber-400 to-orange-500",
    },
    {
        category: "Shopping",
        icon: BiShoppingBag,
        color: "#EC4899",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        category: "Health",
        icon: BsHeartPulse,
        color: "#10B981",
        gradient: "from-emerald-400 to-green-600",
    },
];