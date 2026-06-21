import * as React from "react";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { PetStatusBadge } from "@/components/ui/pet-status-badge";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  city: string;
  uf: string;
  gender: string;
  size: string;
  status: "available" | "adopted";
  photo: string;
  bio?: string;
}

interface PetCardProps extends Omit<
  React.ComponentProps<"article">,
  "onSelect"
> {
  pet: Pet;
  onSelect?: (pet: Pet) => void;
  onSave?: (pet: Pet) => void;
  saved?: boolean;
}

function PetCard({
  pet,
  onSelect,
  onSave,
  saved = false,
  className,
  ...props
}: PetCardProps) {
  const isAdopted = pet.status === "adopted";

  return (
    <article
      data-slot="pet-card"
      data-status={pet.status}
      onClick={() => onSelect?.(pet)}
      className={cn(
        "bg-(--surface) rounded-lg border border-border shadow-sm overflow-hidden cursor-pointer transition-shadow duration-150 hover:shadow-md",
        isAdopted && "opacity-75",
        className,
      )}
      {...props}
    >
      <div data-slot="pet-card-photo" className="relative h-48">
        <Image
          src={pet.photo}
          alt={pet.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        <div className="absolute top-2.5 left-2.5">
          <PetStatusBadge status={pet.status} onPhoto />
        </div>

        {onSave && (
          <button
            data-slot="pet-card-save"
            onClick={(e) => {
              e.stopPropagation();
              onSave(pet);
            }}
            aria-label={
              saved ? "Remover dos favoritos" : "Salvar nos favoritos"
            }
            className={cn(
              "absolute top-2 right-2 size-9 rounded-full flex items-center justify-center transition-colors duration-150 bg-white/80 backdrop-blur-xs",
              saved
                ? "text-(--green-500)"
                : "text-(--ink-300) hover:text-(--green-500)",
            )}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      <div data-slot="pet-card-body" className="p-4.5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[1.1875rem] font-bold text-(--text-primary) tracking-tight">
            {pet.name}
          </h3>
          <span className="text-sm text-(--text-subtle)">{pet.age}</span>
        </div>

        <p className="flex items-center gap-1.5 mt-1 text-sm text-(--text-subtle)">
          <span className="inline-block size-3 opacity-60">🐾</span>
          {pet.breed}
        </p>

        <p className="flex items-center gap-1 mt-2 text-sm text-(--text-subtle)">
          <MapPin size={14} strokeWidth={2} />
          {pet.city}, {pet.uf}
        </p>

        <div data-slot="pet-card-tags" className="flex gap-2 mt-3 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-pill text-xs font-semibold bg-accent text-accent-foreground">
            {pet.gender}
          </span>
          <span className="px-2.5 py-0.5 rounded-pill text-xs font-semibold bg-accent text-accent-foreground">
            {pet.size}
          </span>
        </div>

        <button
          data-slot="pet-card-cta"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(pet);
          }}
          disabled={isAdopted}
          className="mt-4 w-full h-10 rounded-pill bg-(--green-500) text-white text-sm font-semibold transition-colors duration-150 hover:bg-[var(--green-600)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdopted ? "Adotado ♥" : "Ver detalhes"}
        </button>
      </div>
    </article>
  );
}

export { PetCard };
export type { Pet, PetCardProps };
