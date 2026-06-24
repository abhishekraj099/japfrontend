import { COMPONENT_REGISTRY } from "./components";
import type { CardTemplate, TemplateCard } from "./types";

/**
 * TemplateRenderer (Phase 33). Renders one face (front/back) of a card by
 * walking the template's ordered sections and delegating each to its component
 * renderer. Pure mapping — no parsing, no branching on cardType.
 */
interface Props {
  template: CardTemplate;
  card: TemplateCard;
  face: "front" | "back";
}

export function TemplateRenderer({ template, card, face }: Props) {
  const sections = face === "front" ? template.front : template.back;
  return (
    <>
      {sections.map((section, i) => {
        const Component = COMPONENT_REGISTRY[section.component];
        if (!Component) return null;
        return <Component key={`${section.component}-${i}`} card={card} {...(section.props ?? {})} />;
      })}
    </>
  );
}
