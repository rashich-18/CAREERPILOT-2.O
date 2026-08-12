import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NavigationButtons({

step,

totalSteps,

nextStep,

prevStep,

saving,
}){

return(

<div className="mt-12 flex justify-between">

<button

onClick={prevStep}

disabled={step===1}

className="rounded-xl border border-white/10 px-6 py-3 text-white disabled:opacity-40"

>

<ArrowLeft className="inline mr-2" size={18}/>

Back

</button>

<button
  type="button"
  onClick={nextStep}
  disabled={saving}
  className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {saving
    ? "Saving..."
    : step === totalSteps
      ? "Complete Onboarding"
      : "Continue"}
</button>



</div>

)

}