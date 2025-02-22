'use client';

import Onboarding from "~/components/Onboarding";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onComplete = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div>
      <Onboarding onComplete={onComplete}/>
    </div>
  );
}
