/*
  # Create Library Management Tables

  This migration sets up tables for library management system.

  1. New Tables
    - `library_students`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Student name
      - `email` (text, unique) - Student email
      - `phone` (text) - Contact phone
      - `membership_type` (text) - Type: 'monthly', 'quarterly', 'yearly'
      - `membership_start` (date) - Membership start date
      - `membership_end` (date) - Membership end date
      - `status` (text) - Status: 'active', 'expired', 'suspended'
      - `created_at` (timestamp) - Record creation time

    - `library_attendance`
      - `id` (uuid, primary key) - Unique identifier
      - `student_id` (uuid) - Reference to library_students
      - `date` (date) - Attendance date
      - `check_in` (timestamp) - Check-in time
      - `check_out` (timestamp) - Check-out time
      - `created_at` (timestamp) - Record creation time

    - `library_payments`
      - `id` (uuid, primary key) - Unique identifier
      - `student_id` (uuid) - Reference to library_students
      - `amount` (numeric) - Payment amount
      - `payment_type` (text) - Type: 'membership', 'fine', 'other'
      - `payment_date` (date) - Payment date
      - `status` (text) - Payment status: 'completed', 'pending', 'failed'
      - `notes` (text) - Additional notes
      - `created_at` (timestamp) - Record creation time

  2. Security
    - Enable RLS on all tables
    - Authenticated users can read and manage library data

  3. Important Notes
    - Library students are separate from main students
    - Attendance tracks daily library usage
    - Payments track membership and fees
*/

-- Library Students Table
CREATE TABLE IF NOT EXISTS library_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text DEFAULT '',
  membership_type text DEFAULT 'monthly' CHECK (membership_type IN ('monthly', 'quarterly', 'yearly')),
  membership_start date DEFAULT CURRENT_DATE,
  membership_end date DEFAULT CURRENT_DATE + INTERVAL '30 days',
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended')),
  created_at timestamptz DEFAULT now()
);

-- Library Attendance Table
CREATE TABLE IF NOT EXISTS library_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES library_students(id) ON DELETE CASCADE,
  date date DEFAULT CURRENT_DATE,
  check_in timestamptz DEFAULT now(),
  check_out timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Library Payments Table
CREATE TABLE IF NOT EXISTS library_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES library_students(id) ON DELETE CASCADE,
  amount numeric DEFAULT 0,
  payment_type text DEFAULT 'membership' CHECK (payment_type IN ('membership', 'fine', 'other')),
  payment_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all library tables
ALTER TABLE library_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_payments ENABLE ROW LEVEL SECURITY;

-- Policies for library_students
CREATE POLICY "Authenticated users can view library students"
  ON library_students FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create library students"
  ON library_students FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update library students"
  ON library_students FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete library students"
  ON library_students FOR DELETE
  TO authenticated
  USING (true);

-- Policies for library_attendance
CREATE POLICY "Authenticated users can view library attendance"
  ON library_attendance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create library attendance"
  ON library_attendance FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update library attendance"
  ON library_attendance FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete library attendance"
  ON library_attendance FOR DELETE
  TO authenticated
  USING (true);

-- Policies for library_payments
CREATE POLICY "Authenticated users can view library payments"
  ON library_payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create library payments"
  ON library_payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update library payments"
  ON library_payments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete library payments"
  ON library_payments FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for library tables
CREATE INDEX IF NOT EXISTS library_students_email_idx ON library_students(email);
CREATE INDEX IF NOT EXISTS library_students_status_idx ON library_students(status);
CREATE INDEX IF NOT EXISTS library_students_membership_end_idx ON library_students(membership_end);

CREATE INDEX IF NOT EXISTS library_attendance_student_id_idx ON library_attendance(student_id);
CREATE INDEX IF NOT EXISTS library_attendance_date_idx ON library_attendance(date);

CREATE INDEX IF NOT EXISTS library_payments_student_id_idx ON library_payments(student_id);
CREATE INDEX IF NOT EXISTS library_payments_payment_date_idx ON library_payments(payment_date);
CREATE INDEX IF NOT EXISTS library_payments_status_idx ON library_payments(status);