import PartnerLogos from "./PartnerLogos";

export const PartnersSection = ({ title = "Our Partners love Yaku" }: { title: string }) => (
  <>
    <div className="py-24 sm:py-32">
      <div className="flex flex-row items-center justify-center">
        <h2 className="text-xl font-akirabold sm:text-4xl font-bold py-[20px]">
          {title}
        </h2>
      </div>
      <div>
        <PartnerLogos />
      </div>
    </div>
  </>
);