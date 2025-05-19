import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { generateTextJSX } from "@/lib/utils"

export default function ContentSection({ contentSection }) {
  const contentData = contentSection
  return (
    <section className="relative bg-gradient-to-b from-landing-tertiary via-landing-secondary to-[#181818]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full px-4 flex items-center justify-center flex-col py-10 mx-auto">
          <h3
            data-aos="fade-up"
            className="text-center leading-[1.1] text-landing-primary text-4xl md:text-5xl font-bold"
          >
            {contentData.title}
          </h3>

          <div
            data-aos="fade"
            className="text-center p-5 sm:p-8 border-[6px] border-landing-primary rounded-xl mt-5 space-y-6 sm:space-y-6 text-lg bg-landing-background min-w-full"
          >
            <h4 className="text-landing-secondary text-3xl md:text-4xl">
              {contentData.subtitle}
            </h4>

            <ProseInnerHtmlContainer
              className="text-landing-foreground text-sm md:text-base text-justify"
              html={contentData.text}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
