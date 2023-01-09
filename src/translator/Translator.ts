import i18next, {TFunction} from "i18next";
import en from "../../translations/translations.en.json";
import fr from "../../translations/translations.fr.json";
import es from "../../translations/translations.es.json";
import Backend from 'i18next-fs-backend';

class Translator {
  private i18next: TFunction;

  constructor() {
    this.init();
  }

  init = async () => {
    this.t = await i18next
      .use(Backend)
      .init({
        lng: 'fr',
        fallbackLng: "en",
        debug: false,
        preload: ['en', 'fr', 'es'],
        ns: ['translations'],
        defaultNS: 'translations',
        backend: {
          loadPath: 'translations/{{ns}}.{{lng}}.json'
        },
        resources: {
          en: {
            translations: en
          },
          fr: {
            translations: fr
          },
          es: {
            translations: es
          }
        }
      });
  }
  t = (...args) => {
    this.i18next(args)
  }
}

export default new Translator();
