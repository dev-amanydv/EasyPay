"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export const AddMoney = () => {
    const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/transfer");
      }}
    >
      Add Money
    </Button>
  );
};
