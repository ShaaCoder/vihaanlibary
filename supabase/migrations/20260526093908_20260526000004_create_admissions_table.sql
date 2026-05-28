/*
  # Create Admissions Table

  This migration sets up the admissions table for managing admission applications.

  1. New Tables
    - `admissions`
      - `id` (uuid, primary key) - Unique identifier
      - `student_name` (text) - Name of the applicant
      - `email` (text) - Applicant email
      - `phone` (text) - Contact phone
      - `course` (text) - Applied course
      - `class` (text) - Class applied for
      - `subjects` (text[]) - Array of subjects
      - `reference_number` (text) - Reference number for tracking
      - `parent_name` (text) - Parent/guardian name
      - `parent_phone` (text) - Parent contact phone
      - `address` (text) - Residential address
      - `status` (text) - Application status: 'pending', 'approved', 'rejected'
      - `message` (text) - Additional message/notes
      - `created_at` (timestamp) - Application submission time
      - `updated_at` (timestamp) - Last update time

  2. Security
    - Enable RLS on `admissions` table
    - Authenticated users can read and manage admissions

  3. Important Notes
    - Status defaults to 'pending'
    - Tracks both student and parent information
*/

CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  course text DEFAULT '',
  class text DEFAULT '',
  subjects text[] DEFAULT '{}',
  reference_number text DEFAULT '',
  parent_name text DEFAULT '',
  parent_phone text DEFAULT '',
  address text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  message text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Policies for admissions table
CREATE POLICY "Authenticated users can view admissions"
  ON admissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create admissions"
  ON admissions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update admissions"
  ON admissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admissions"
  ON admissions FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS admissions_email_idx ON admissions(email);
CREATE INDEX IF NOT EXISTS admissions_status_idx ON admissions(status);
CREATE INDEX IF NOT EXISTS admissions_created_at_idx ON admissions(created_at DESC);
CREATE INDEX IF NOT EXISTS admissions_course_idx ON admissions(course);

-- Trigger for updated_at
CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();