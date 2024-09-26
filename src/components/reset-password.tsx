import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField, TextFieldLabel, TextFieldRoot } from "./ui/textfield";
import { Button } from "./ui/button";
import { resetPassword } from "@/libs/auth-client";
import { createSignal } from "solid-js";

export function ResetPasswordCard() {
  const [password, setPassword] = createSignal("");
  return (
    <Card class="max-w-max">
      <CardHeader>
        <CardTitle class="text-lg md:text-xl">Reset Password</CardTitle>
        <CardDescription class="text-xs md:text-sm">
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <TextFieldRoot class="w-full">
              <TextFieldLabel for="email">Password</TextFieldLabel>
              <TextField
                type="password"
                placeholder="Password"
                value={password()}
                onInput={(e) => {
                  if ("value" in e.target)
                    setPassword(e.target.value as string);
                }}
              />
            </TextFieldRoot>

            <Button
              onclick={async () => {
                await resetPassword(
                  {
                    newPassword: password(),
                  },
                  {
                    onError: (ctx) => {
                      alert(ctx.error.message);
                    },
                    onSuccess: () => {
                      window.location.href = "/sign-in";
                    },
                  }
                );
              }}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex-col">
        <div class="flex justify-center w-full border-t py-4">
          <p class="text-center text-xs text-neutral-500">
            Secured by{" "}
            <span class="text-orange-900 dark:text-orange-200">
              better-auth.
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
