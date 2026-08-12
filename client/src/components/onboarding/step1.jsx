import { Sparkles } from "lucide-react";

export default function Step1(){

return(

<div className="text-center">

<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20">

<Sparkles
className="text-violet-300"
size={36}
/>

</div>

<h1 className="mt-8 text-4xl font-bold text-white">

Welcome to CareerPilot

</h1>

<p className="mt-4 text-gray-400 text-lg">

Let's personalize your AI Career Coach.

This takes less than 2 minutes.

</p>

</div>

)

}