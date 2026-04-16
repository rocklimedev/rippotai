"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { services } from "@/lib/config";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  CheckCircle,
  ArrowRight,
  Layers,
  Workflow,
  Package,
} from "lucide-react";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <div>Service not found</div>;

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative h-[80vh] w-full">
        <Image
          src={service.banner}
          alt={service.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-[10%] left-[5%] text-white">
          <h1 className="text-5xl font-light tracking-wide">
            {service.title}
          </h1>
        </div>
      </section>

      {/* ===== Intro ===== */}
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <p className="text-lg leading-relaxed text-muted-foreground">
          {service.intro}
        </p>
      </section>

      {/* ===== Features ===== */}
      <section className="py-16 px-5 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">What We Offer</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((item, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="flex items-start gap-3 p-5">
                  <CheckCircle className="text-primary w-5 h-5 mt-1" />
                  <span className="text-muted-foreground">{item}</span>
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
            {service.process.map((step, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-5 flex gap-4">
                  <div className="font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-muted-foreground">{step}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Deliverables ===== */}
      <section className="py-16 px-5 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Deliverables</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.deliverables.map((item, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="flex items-start gap-3 p-5">
                  <CheckCircle className="text-primary w-5 h-5 mt-1" />
                  <span className="text-muted-foreground">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Gallery</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {service.gallery.map((img, i) => (
              <div
                key={i}
                className="relative h-[250px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt="gallery"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-5 bg-primary text-white text-center">
        <h2 className="text-3xl mb-6">{service.cta}</h2>

        <Button
          size="lg"
          className="bg-white text-black hover:bg-white/90"
        >
          Contact Us
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>
    </>
  );
}