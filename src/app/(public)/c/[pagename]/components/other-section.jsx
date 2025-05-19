import { ProseInnerHtmlContainer } from "@/components/prose-container";

export default function OtherSection({ otherData }) {
  return (
    <section className="relative bg-gradient-to-b from-landing-tertiary via-landing-secondary to-[#181818] py-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full space-y-8 px-4 flex items-center justify-center flex-col mx-auto">
          <h2 className="text-6xl text-center leading-[1.1] text-landing-primary">
            {otherData.title}
          </h2>

          <div className="text-center p-4 sm:p-8 border-[6px] border-landing-primary rounded-xl space-y-6 sm:space-y-6 text-lg bg-landing-background w-full">
            <h3 className="text-landing-secondary">{otherData.subtitle}</h3>

            <ProseInnerHtmlContainer
              className="space-y-3"
              html={otherData.text}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
