// components/Footer.tsx

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-blue-100 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/vihaanlogo.png"
                  alt="Vihaan Education Academy"
                  width={50}
                  height={50}
                  className="h-12 w-12 object-contain"
                />

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Vihaan Education
                  </h3>

                  <p className="text-sm text-gray-500">Academy</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                Transforming lives through quality education since 2001.
                Helping students achieve success in NIOS, CBSE, and other
                educational programs.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="rounded-full bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="rounded-full bg-pink-100 p-2 text-pink-600 transition hover:bg-pink-200"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="rounded-full bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="rounded-full bg-cyan-100 p-2 text-cyan-600 transition hover:bg-cyan-200"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-base font-semibold text-gray-900">
                Quick Links
              </h4>

              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <Link
                    href="/"
                    className="transition hover:text-blue-600"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="transition hover:text-blue-600"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blogs"
                    className="transition hover:text-blue-600"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admission"
                    className="transition hover:text-blue-600"
                  >
                    Admission
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-4 text-base font-semibold text-gray-900">
                Contact Info
              </h4>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-600" />

                  <span>
                    VIHAAN EDUCATION ACADEMY,
                    <br />
                    2nd Floor, Vijay Vihar,
                    <br />
                    Vijay Vihar Phase I,
                    <br />
                    Phase 1, Sector 4, Rohini,
                    <br />
                    New Delhi, Delhi - 110085
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600" />

                  <a
                    href="tel:+919212644428"
                    className="hover:text-blue-600"
                  >
                    +91 92126 44428
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-green-600" />

                  <span>WhatsApp Support Available</span>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-red-500" />

                  <span>info@vihaaneducation.in</span>
                </li>
              </ul>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="mb-4 text-base font-semibold text-gray-900">
                Operating Hours
              </h4>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />

                  <span>Mon - Fri : 9:00 AM - 8:00 PM</span>
                </li>

                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />

                  <span>Saturday : 10:00 AM - 6:00 PM</span>
                </li>

                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />

                  <span>Sunday : Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Google Map */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
              <div className="border-b border-blue-100 px-5 py-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Find Us On Map
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  2nd Floor, Vijay Vihar, Sector 4, Rohini, New Delhi
                </p>
              </div>

              <div className="h-[350px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.70294315081043!2d77.10189916194851!3d28.7121608012656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06ae769c788f%3A0xac313f49064bf5d9!2sVIHAAN%20EDUCATION%20ACADEMY!5e0!3m2!1sen!2sin!4v1779955985930!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-blue-100 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-500">
              © 2026 Vihaan Education Academy. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-sm text-gray-500">
              <Link
                href="/privacy-policy"
                className="transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-blue-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}