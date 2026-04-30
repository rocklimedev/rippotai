'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ArrowRight, Layers, Workflow, Package } from 'lucide-react';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <div>Service not found</div>;

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative h-screen w-full">
        <Image
          src={service.banner}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-[10%] left-[5%] text-white">
          <h1 className="text-5xl font-light tracking-wide">{service.title}</h1>
        </div>
      </section>

      {/* ===== Intro ===== */}
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <p className="text-lg leading-relaxed text-muted-foreground">
          {service.intro}
        </p>
      </section>

      {/* ===== Offerings ===== */}
      <section className="py-16 px-5 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">What We Offer</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.offerings?.map((item, i) => (
              <Card
                key={i}
                className="border-none shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-5">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Workflow className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Our Process</h2>
          </div>

          <div className="space-y-6">
            {service.process?.map((item, i) => (
              <Card key={i} className="border-none shadow-none">
                <CardContent className="p-5 flex gap-4">
                  <div className="font-bold text-primary text-lg">
                    {item.step}
                  </div>

                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-5 bg-primary text-white text-center">
        <h2 className="text-3xl mb-6">{service.cta}</h2>

        <Link href="/contact">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </section>
    </>
  );
}
