import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Define Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  onNavigateToSignUp?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess, onNavigateToSignUp }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example submission logic (replace with actual API call)
    // This is just for demonstration to show success/error handling
    if (data.username === "testuser" && data.password === "password123") {
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    } else {
      // Example of setting field errors based on a failed login attempt
      form.setError("username", { type: "manual", message: "Invalid credentials" });
      form.setError("password", { type: "manual", message: "Invalid credentials" });
      // Or a general root error:
      // form.setError("root.serverError", { message: "Invalid username or password." });
    }
    setIsLoading(false);
  };

  const handleSignUpClick = React.useCallback(() => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      console.log("Navigate to Sign Up page action triggered (no handler provided)");
    }
  }, [onNavigateToSignUp]);

  return (
    <Card className={cn(
      "w-[320px] p-6 flex flex-col gap-6 bg-card text-card-foreground",
      className
    )}>
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-card-foreground">
        Log in
      </h2>

      {/* Form: InputFields + PrimaryButton */}
      {/* The <Form> provider itself is not a DOM element affecting flexbox directly.
          Its child, the <form> tag, becomes a direct flex child of Card. */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    autoComplete="username"
                    {...field}
                    className="bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:ring-ring"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...field}
                    className="bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:ring-ring"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Optional: Display general form error, if using form.setError("root.serverError", ...) 
          {form.formState.errors.root?.serverError && (
            <p className="text-sm font-medium text-destructive text-center">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          */}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Form>

      {/* SignUpLink */}
      <div className="text-center"> {/* This div is a flex child of Card */} 
        <Button
          variant="link"
          size="sm"
          onClick={handleSignUpClick}
          className="text-muted-foreground hover:text-primary px-0 font-normal"
          disabled={isLoading}
        >
          or, sign up
        </Button>
      </div>
    </Card>
  );
};

export default LoginForm;
