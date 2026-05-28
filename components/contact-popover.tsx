'use client';

import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function ContactPopover() {
  const phoneNumber = '+919876543210';
  const whatsappMessage = 'Hi, I am interested in learning more about your courses.';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg h-10 w-10 sm:h-12 sm:w-12">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-blue-100 p-0">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-4 rounded-t-lg">
          <h3 className="font-bold text-lg">Get in Touch</h3>
          <p className="text-sm opacity-90">Contact us via your preferred method</p>
        </div>
        <div className="p-4 space-y-3">
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Call Us</p>
              <p className="text-xs text-gray-600 truncate">{phoneNumber}</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-green-100 hover:bg-green-50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
              <p className="text-xs text-gray-600 truncate">Chat with us</p>
            </div>
          </a>

          <a
            href="https://maps.google.com/maps?q=Vihaan+Education+Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-red-100 hover:bg-red-50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
              <MapPin className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Location</p>
              <p className="text-xs text-gray-600 truncate">Visit our office</p>
            </div>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
