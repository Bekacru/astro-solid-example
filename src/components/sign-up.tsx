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
import { Checkbox, CheckboxControl, CheckboxLabel } from "./ui/checkbox";
import { signIn, signUp } from "@/libs/auth-client";
import { createSignal } from "solid-js";
import { convertImageToBase64 } from "@/libs/utils";

export function SignUpCard() {
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [image, setImage] = createSignal<File>();
  const [rememberMe, setRememberMe] = createSignal(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle class="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription class="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <div class="flex items-center gap-2">
              <TextFieldRoot class="w-full">
                <TextFieldLabel for="name">First Name</TextFieldLabel>
                <TextField
                  type="first-name"
                  placeholder="First Name"
                  value={firstName()}
                  onInput={(e) => {
                    if ("value" in e.target)
                      setFirstName(e.target.value as string);
                  }}
                />
              </TextFieldRoot>
              <TextFieldRoot class="w-full">
                <TextFieldLabel for="name">Last Name</TextFieldLabel>
                <TextField
                  type="last-name"
                  placeholder="Last Name"
                  value={lastName()}
                  onInput={(e) => {
                    if ("value" in e.target)
                      setLastName(e.target.value as string);
                  }}
                />
              </TextFieldRoot>
            </div>
            <TextFieldRoot class="w-full">
              <TextFieldLabel for="email">Email</TextFieldLabel>
              <TextField
                type="email"
                placeholder="Email"
                value={email()}
                onInput={(e) => {
                  if ("value" in e.target) setEmail(e.target.value as string);
                }}
              />
            </TextFieldRoot>
            <TextFieldRoot class="w-full">
              <TextFieldLabel for="password">Password</TextFieldLabel>
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
            <TextFieldRoot>
              <TextFieldLabel>Image</TextFieldLabel>
              <TextField
                type="file"
                accept="image/*"
                placeholder="Image"
                onChange={(e: any) => {
                  const file = e.target.files?.[0];
                  if ("value" in e.target) setImage(file);
                }}
              />
            </TextFieldRoot>
            <Button
              onclick={async () => {
                signUp.email({
                  name: `${firstName()} ${lastName()}`,
                  image: image()
                    ? await convertImageToBase64(image()!)
                    : undefined,
                  email: email(),
                  password: password(),
                  callbackURL: "/",
                  fetchOptions: {
                    onError(context) {
                      alert(context.error.message);
                    },
                  },
                });
              }}
            >
              Sign Up
            </Button>
            <Button class="gap-2" variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="m473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72c-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 0 1-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4c57.73 0 112.45-22.62 151.45-63.66c38.34-40.4 58.17-96.3 58.17-154.9c0-24.67-2.48-39.32-2.59-39.96"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </div>
          <p class="text-sm text-center">
            Already have an account?{" "}
            <a href="/sign-in" class="text-blue-500">
              Sign In
            </a>
          </p>
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
