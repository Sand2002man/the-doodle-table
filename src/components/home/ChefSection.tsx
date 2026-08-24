'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { chef } from '@/data/restaurant';
import { HandwrittenNote, StarDoodle } from '@/components/doodles/Doodles';

export function ChefSection() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-cream-300 bg-charcoal md:rounded-[2.5rem] lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={chef.image}
              alt={chef.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent lg:bg-gradient-to-r" />
          </motion.div>

          <div className="relative px-6 pb-10 pt-2 text-cream-100 sm:px-10 lg:py-14">
            <StarDoodle className="absolute right-8 top-4 h-8 w-8 opacity-50" color="#E07A3D" />
            <p className="font-hand text-lg text-terracotta-soft">{chef.title}</p>
            <h2 className="mt-2 font-display text-3xl text-cream-50 md:text-4xl">
              {chef.name}
            </h2>
            <p className="mt-5 leading-relaxed text-cream-300/85">{chef.bio}</p>
            <blockquote className="mt-6 border-l-2 border-terracotta pl-4 italic leading-relaxed text-cream-200/90">
              “{chef.philosophy}”
            </blockquote>
            <p className="mt-6 text-sm text-cream-300/70">
              <span className="text-terracotta-soft">Signature dish — </span>
              {chef.signatureDish}
            </p>
            <div className="mt-8">
              <HandwrittenNote className="!text-terracotta-soft" rotate={-2}>
                {chef.doodleNote}
              </HandwrittenNote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
