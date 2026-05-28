/*
  # Create Library Management System Tables

  1. New Tables
    - `library_students`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `phone` (text, not null)
      - `email` (text)
      - `membership_type` (text: 'basic', 'premium', 'annual')
      - `monthly_fee` (numeric, not null)
      - `join_date` (timestamp)
      - `membership_expiry` (timestamp)
      - `payment_status` (text: 'paid', 'pending', 'overdue')
      - `status` (text: 'active', 'inactive')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `library_attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `check_in_time` (timestamp)
      - `check_out_time` (timestamp)
      - `date` (date)
      - `created_at` (timestamp)

    - `library_payments`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `amount` (numeric, not null)
      - `payment_date` (timestamp)
      - `month` (text)
      - `payment_method` (text)
      - `status` (text: 'completed', 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for admin access

  3. Indexes
    - Index on student_id for attendance and payments
    - Index on payment_status and status for filtering
    - Index on membership_expiry for auto-expiry detection
*/

-- Create library_students table
CREATE TABLE IF NOT EXISTS library_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  membership_type text NOT NULL DEFAULT 'basic',
  monthly_fee numeric NOT NULL DEFAULT 0,
  join_date timestamptz DEFAULT now(),
  membership_expiry timestamptz,
  payment_status text NOT NULL DEFAULT 'pending',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create library_attendance table
CREATE TABLE IF NOT EXISTS library_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES library_students(id) ON DELETE CASCADE,
  check_in_time timestamptz,
  check_out_time timestamptz,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create library_payments table
CREATE TABLE IF NOT EXISTS library_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES library_students(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  payment_date timestamptz DEFAULT now(),
  month text,
  payment_method text,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE library_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated admin users
CREATE POLICY "Admins can manage library students"
  ON library_students
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage library attendance"
  ON library_attendance
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage library payments"
  ON library_payments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_library_students_phone ON library_students(phone);
CREATE INDEX idx_library_students_payment_status ON library_students(payment_status);
CREATE INDEX idx_library_students_status ON library_students(status);
CREATE INDEX idx_library_students_membership_expiry ON library_students(membership_expiry);
CREATE INDEX idx_library_attendance_student_id ON library_attendance(student_id);
CREATE INDEX idx_library_attendance_date ON library_attendance(date);
CREATE INDEX idx_library_payments_student_id ON library_payments(student_id);
CREATE INDEX idx_library_payments_month ON library_payments(month);
