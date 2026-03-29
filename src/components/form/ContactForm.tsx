"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Send, MapPin, Facebook, Twitter, Github, Linkedin, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendContactInquiry } from "@/actions/contact.actions";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/shihab.dev", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/shihab_dev", label: "X" },
    { icon: Github, href: "https://github.com/shihabuddin-dev", label: "Github" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shihab-dev/", label: "Linkedin" },
    { icon: Globe, href: "https://shihab-dev.web.app/", label: "Website" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const promise = sendContactInquiry(formData);

    toast.promise(promise, {
      loading: "Sending your message...",
      success: (data) => {
        setFormData({ name: "", email: "", message: "" });
        return data.message || "Message sent successfully!";
      },
      error: (err) => err.message || "Failed to send message.",
      finally: () => setLoading(false),
    });
  };

  return (
    <section className="container mx-auto px-6 max-w-7xl py-20 animate-in fade-in duration-1000">
      <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Form Column */}
          <div className="p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800">
            <div className="mb-10">
               <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white mb-2">Get in touch</h2>
               <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed">Have a sustainable idea or a question? We're here to help.</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-zinc-900 dark:text-white ml-1">Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name here..." 
                  disabled={loading}
                  className="h-14 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-zinc-900 dark:text-white ml-1">Email</label>
                <Input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your Email here..." 
                  disabled={loading}
                  className="h-14 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-zinc-900 dark:text-white ml-1">Message</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  disabled={loading}
                  className="w-full rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium text-zinc-900 dark:text-white"
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="h-16 w-full rounded-2xl font-black text-lg active:scale-95 transition-all shadow-xl shadow-primary/20"
              >
                {loading ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-3 h-5 w-5" />
                )}
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Connect with us</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary/30 transition-all active:scale-90 shadow-sm"
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="relative min-h-[400px] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
             {/* Map Placeholder with Iframe (Bangladesh Location) */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902263004415!2d90.39088431535783!3d23.75087579467657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd00000001%3A0x1b5a5b5b5b5b5b5b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1711612456789!5m2!1sen!2sbd" 
               className="absolute inset-0 w-full h-full grayscale opacity-70 contrast-125 dark:invert dark:opacity-30"
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>

             {/* Location Overlay Card */}
             <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl space-y-4">
                   <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                         <h4 className="font-black text-zinc-900 dark:text-white uppercase text-[10px] tracking-widest mb-0.5">Dhaka Office</h4>
                         <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 leading-snug">
                            12/A Dhanmondi R/A<br />
                            Dhaka 1209, Bangladesh
                         </p>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <a href="https://maps.app.goo.gl/dhaka" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">Directions</a>
                      <a href="https://shihab-dev.web.app/" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-primary font-black">Visit Portfolio</a>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
