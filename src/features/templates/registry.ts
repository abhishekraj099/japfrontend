import type { CardTemplate, TemplateCard } from "./types";
import {
  DEFAULT_TEMPLATES,
  BASIC_TEMPLATE,
  COMBINED_TEMPLATE,
  SENTENCE_TEMPLATE,
  GRAMMAR_TEMPLATE,
} from "./defaults";

/**
 * TemplateRegistry (Phase 33). Holds compiled templates and resolves the right
 * one for a card. Built once at module load; lookups are O(1) map reads — no
 * per-render parsing. Future custom/community templates register here without
 * touching review components.
 */
class TemplateRegistry {
  private byId = new Map<string, CardTemplate>();

  registerTemplate(t: CardTemplate): void {
    this.byId.set(t.id, t);
  }

  getTemplate(id: string): CardTemplate | undefined {
    return this.byId.get(id);
  }

  /** Default template for a card type (combined is a render mode of vocab). */
  getDefaultTemplate(cardType: TemplateCard["cardType"]): CardTemplate {
    if (cardType === "sentence") return SENTENCE_TEMPLATE;
    if (cardType === "grammar") return GRAMMAR_TEMPLATE;
    return BASIC_TEMPLATE;
  }

  /**
   * Resolve the template a card should render through. Mirrors the legacy
   * branching: a vocab card carrying an example sentence uses the Combined
   * template; everything else uses its card-type default.
   */
  resolve(card: TemplateCard): CardTemplate {
    if (card.cardType === "vocab" && card.exampleSentence) return COMBINED_TEMPLATE;
    return this.getDefaultTemplate(card.cardType);
  }
}

export const templateRegistry = new TemplateRegistry();
DEFAULT_TEMPLATES.forEach((t) => templateRegistry.registerTemplate(t));

export type { CardTemplate, TemplateCard };
