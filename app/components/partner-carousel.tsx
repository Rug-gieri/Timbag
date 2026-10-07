import Image from "next/image";

const partners = [
  { name: "Magrão Pinturas", logo: "/magrao_pinturas_logo.png" },
  { name: "Infanto Modas", logo: "/infanto_modas_logo.png" },
  { name: "Arawá", logo: "/arawa-logo.png" },
  { name: "Ahois", logo: "/ahois_logo.png" },
  { name: "Torres Barbaearia", logo: "/torres_logo.png" },
  { name: "GL Soluções Elétricas" },
  { name: "Café Preto" },
];

export function PartnerCarousel() {
  return (
    <section className="scroll-mt-24 border-t border-zinc-200/70">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Quem confia na Gambit
        </p>
        <div
          className="partner-marquee mt-10 overflow-hidden"
          aria-label="Empresas parceiras"
        >
          <div className="partner-marquee-track flex items-center gap-14">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex shrink-0 items-center gap-3 text-zinc-400"
                aria-hidden={index >= partners.length}
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={63}
                    className="h-10 w-auto"
                  />
                ) : (
                  <>
                    <span className="h-6 w-6 rounded-md bg-zinc-200" />
                    <span className="font-serif text-lg font-semibold tracking-tight whitespace-nowrap">
                      {partner.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
