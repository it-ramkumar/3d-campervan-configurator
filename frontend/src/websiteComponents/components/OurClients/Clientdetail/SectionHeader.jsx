import { Heading2, RichParagraph } from "../../Common/Common";

export default function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-primary rounded-lg shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <Heading2 text={title} className="text-primary" />
      {subtitle && (
        <RichParagraph className="mt-2 text-primary/60 max-w-2xl mx-auto">
          {subtitle}
        </RichParagraph>
      )}
    </div>
  );
}