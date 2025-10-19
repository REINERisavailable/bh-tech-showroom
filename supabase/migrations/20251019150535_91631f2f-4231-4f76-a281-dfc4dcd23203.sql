-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Create a new policy that allows:
-- 1. Admins to manage all roles
-- 2. ANY authenticated user to insert the FIRST admin role if none exists
CREATE POLICY "Allow first admin creation and admin management"
ON public.user_roles
FOR ALL
USING (
  -- Admins can do anything
  has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Allow if user is creating their own role AND no admin exists yet
  (
    user_id = auth.uid() 
    AND role = 'admin'::app_role 
    AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
  )
)
WITH CHECK (
  -- Admins can create any role
  has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Allow creating first admin role
  (
    user_id = auth.uid() 
    AND role = 'admin'::app_role 
    AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
  )
);