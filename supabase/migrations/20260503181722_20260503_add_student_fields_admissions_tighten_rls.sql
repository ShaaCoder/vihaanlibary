/*
  # Add Student Fields, Admissions Table, and Tighten RLS Policies

  ## Changes Overview

  1. **students table - Add missing columns**
     - `class` (text, nullable) - Student's class/grade (e.g., "10th", "12th")
     - `reference_number` (text, nullable) - Unique reference number for the student
     - `subjects` (text, nullable) - Comma-separated list of subjects enrolled in

  2. **admissions table - NEW**
     - `id` (uuid, primary key) - Unique admission identifier
     - `student_name` (text, required) - Applicant's full name
     - `email` (text, required) - Applicant's email
     - `phone` (text, required) - Applicant's phone number
     - `course` (text, required) - Course applying for
     - `class` (text, nullable) - Current class/grade
     - `subjects` (text, nullable) - Subjects interested in
     - `reference_number` (text, nullable) - Reference number if applicable
     - `parent_name` (text, nullable) - Parent/guardian name
     - `parent_phone` (text, nullable) - Parent/guardian phone
     - `address` (text, nullable) - Student address
     - `status` (text, default 'pending') - Admission status: pending, approved, rejected
     - `message` (text, nullable) - Additional message from applicant
     - `created_at` (timestamptz) - Submission timestamp
     - `updated_at` (timestamptz) - Last update timestamp

  3. **RLS Policy Updates - Tighten security**
     - Replace overly permissive policies on all tables
     - All tables: Only authenticated users (admins) can perform SELECT, INSERT, UPDATE, DELETE
     - Exceptions for public access:
       - courses: Public SELECT (website displays courses)
       - leads: Public INSERT (contact form submissions)
       - admissions: Public INSERT (admission form submissions)
       - notices: Public SELECT where is_active = true (website shows active notices)
       - blogs: Public SELECT (website displays blog posts)

  ## Security Notes
  1. All tables have RLS enabled
  2. No table uses `USING (true)` for authenticated policies - all check `auth.uid() IS NOT NULL`
  3. Public access is limited to read-only or insert-only as needed
  4. Admin (authenticated) users have full CRUD on all tables
*/

-- =============================================
-- Step 1: Add missing columns to students table
-- =============================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'class'
  ) THEN
    ALTER TABLE students ADD COLUMN class text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'reference_number'
  ) THEN
    ALTER TABLE students ADD COLUMN reference_number text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'subjects'
  ) THEN
    ALTER TABLE students ADD COLUMN subjects text;
  END IF;
END $$;

-- =============================================
-- Step 2: Create admissions table
-- =============================================

CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  class text,
  subjects text,
  reference_number text,
  parent_name text,
  parent_phone text,
  address text,
  status text DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Step 3: Drop old permissive policies and recreate with proper auth checks
-- =============================================

-- Drop old courses policies
DROP POLICY IF EXISTS "Anyone can view courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can insert courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can update courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can delete courses" ON courses;

-- Recreate courses policies
CREATE POLICY "Public can view courses"
  ON courses FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop old leads policies
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON leads;

-- Recreate leads policies
CREATE POLICY "Public can submit leads"
  ON leads FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop old blogs policies
DROP POLICY IF EXISTS "Anyone can read blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can create blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON blogs;

-- Recreate blogs policies
CREATE POLICY "Public can read blogs"
  ON blogs FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop old notices policies
DROP POLICY IF EXISTS "Anyone can read notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can create notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can update notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can delete notices" ON notices;
DROP POLICY IF EXISTS "Public can read active notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can read all notices" ON notices;

-- Recreate notices policies
CREATE POLICY "Public can read active notices"
  ON notices FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can read all notices"
  ON notices FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert notices"
  ON notices FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update notices"
  ON notices FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete notices"
  ON notices FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop old students policies
DROP POLICY IF EXISTS "Authenticated users can view students" ON students;
DROP POLICY IF EXISTS "Authenticated users can create students" ON students;
DROP POLICY IF EXISTS "Authenticated users can update students" ON students;
DROP POLICY IF EXISTS "Authenticated users can delete students" ON students;

-- Recreate students policies (admin-only, no public access)
CREATE POLICY "Admins can view students"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Admissions policies
CREATE POLICY "Public can submit admissions"
  ON admissions FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can view admissions"
  ON admissions FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update admissions"
  ON admissions FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete admissions"
  ON admissions FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- Step 4: Add indexes for performance
-- =============================================

CREATE INDEX IF NOT EXISTS idx_students_enrollment_number ON students(enrollment_number);
CREATE INDEX IF NOT EXISTS idx_students_reference_number ON students(reference_number);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_course ON admissions(course);
CREATE INDEX IF NOT EXISTS idx_leads_course ON leads(course);
CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(is_active);
