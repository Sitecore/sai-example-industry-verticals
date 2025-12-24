import { Destination } from '@/types/destination';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createNumberField,
  createRichTextField,
  createTextField,
} from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createIconLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const icons = ['Phone', 'Mail', 'CreditCard'];
    const texts = ['+1 (555) 123-4567', 'support@skywings.com', '24/7 Customer Service'];

    return {
      id: `iconlink-${i}`,
      link: createIGQLField(
        createLinkField(texts[i % texts.length])
      ),
      iconName: {
        jsonValue: {
          value: icons[i % icons.length],
        },
      },
      iconImage: {
        jsonValue: createImageField('logo')},
    };
  });

export const generateDestinations = (count: number): Destination[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `dest-${i + 1}`,
    name: `destination-${i + 1}`,
    displayName: `Destination ${i + 1}`,
    url: '',
    fields: {
      Title: createTextField(`Destination ${i + 1}`),
      ShortDescription: createTextField(`Short description for Destination ${i + 1}`),
      Content: createRichTextField(3),
      Image: createImageField(),
      Label: createTextField('City'),
      Country: createTextField('France'),
      Continent: createTextField('Europe'),
      Temperatures: createTextField('5-25°C'),
      TripDuration: createTextField('4-7 Days'),
      TripPeriods: createTextField('Apr-Jun, Sep-Oct'),
      Rating: createNumberField(4.8),
      NumberOfReviews: createNumberField(34),
      Price: createTextField(`from $${799 + i * 100}`),
      FlightTime: createTextField('11–13 hours from US West Coast'),
      Airports: createTextField('Charles de Gaulle Airport (CDG)'),
      DirectFlights: createTextField(
        'Direct flights available from New York, London, Tokyo, and Sydney.'
      ),
      Language: createTextField('French'),
      Currency: createTextField('Euro (€)'),
      TimeZone: createTextField('GMT+1'),
      Visa: createTextField('No'),

      Activities: [
        {
          id: '6ff2253b-e37f-48cb-8014-cbe2020144cc',
          url: '/Data/Activities/Paris/Culture',
          name: 'Culture',
          displayName: 'Culture',
          fields: {
            Title: createTextField('Culture & Heritage'),
            Description: createRichTextField(2),
          },
        },
        {
          id: 'f599264d-e23d-4abd-b793-c87bdea82c99',
          url: '/Data/Activities/Paris/Food',
          name: 'Food',
          displayName: 'Food',
          fields: {
            Title: createTextField('Food & Dining'),
            Description: createRichTextField(2),
          },
        },
      ],

      Highlights: [
        {
          id: '5ae974bd-1e55-4193-9f1c-b321b1a1d1f2',
          url: '/Data/Highlights/Paris/Eiffel-Tower',
          name: 'Eiffel Tower',
          displayName: 'Eiffel Tower',
          fields: {
            Title: createTextField('Eiffel Tower'),
            Description: createTextField(
              'The iconic symbol of Paris, offering unforgettable city views by day and night.'
            ),
            Label: createTextField('Iconic'),
            Image: createImageField(),
          },
        },
        {
          id: '68310edd-7fb9-41ec-800e-4e73af7235e6',
          url: '/Data/Highlights/Paris/The-Louvre-Museum',
          name: 'The Louvre Museum',
          displayName: 'The Louvre Museum',
          fields: {
            Title: createTextField('The Louvre Museum'),
            Description: createTextField(
              'The world’s largest art museum, home to masterpieces like the Mona Lisa.'
            ),
            Label: createTextField('Culture'),
            Image: createImageField(),
          },
        },
      ],

      Hotels: [
        {
          id: '296feb19-eed9-42e1-8763-7bdad8dca3f5',
          url: '/Data/Hotels/Paris/Luxury-Hotels',
          name: 'Luxury Hotels',
          displayName: 'Luxury Hotels',
          fields: {
            Title: createTextField('Luxury Hotels'),
            PriceRange: createTextField('€350–800+/night'),
            Description: createTextField(
              'High-end stays with elegant design, top service, and prime central locations.'
            ),
            PopularOptions: createRichTextField(2),
          },
        },
        {
          id: '0f13144f-2045-4d8c-b1ff-7396d8909d45',
          url: '/Data/Hotels/Paris/Boutique-Hotels',
          name: 'Boutique Hotels',
          displayName: 'Boutique Hotels',
          fields: {
            Title: createTextField('Boutique Hotels'),
            PriceRange: createTextField('€150–350/night'),
            Description: createTextField(
              'Stylish, intimate hotels with character and a more personal atmosphere.'
            ),
            PopularOptions: createRichTextField(2),
          },
        },
      ],

      TravelTips: [
        {
          id: '59352b24-4cfa-46e5-9609-f2784218686e',
          url: '/Data/Travel-Tips/Paris/Culture',
          name: 'Culture',
          displayName: 'Culture',
          fields: {
            Title: createTextField('Cultural & Practical Tips'),
            Description: createRichTextField(2),
          },
        },
        {
          id: '18c5cefb-3901-40e0-9409-e41b6c141020',
          url: '/Data/Travel-Tips/Paris/Transportation',
          name: 'Transportation',
          displayName: 'Transportation',
          fields: {
            Title: createTextField('Getting Around'),
            Description: createRichTextField(2),
          },
        },
      ],

      Weather: [
        {
          id: '94d776c1-e292-4487-923e-5fb1f6016cea',
          url: '/Data/Weathers/Paris/Spring-Summer',
          name: 'Spring Summer',
          displayName: 'Spring Summer',
          fields: {
            Title: createTextField('Spring & Summer'),
            Duration: createTextField('Apr–Sep'),
            Image: createImageField(),
            Temperature: createTextField('15–25°C'),
            Description: createTextField(
              'Mild to warm weather, long days, and ideal for sightseeing and outdoor cafés'
            ),
          },
        },
        {
          id: '23609745-76ec-44a7-ad50-df020b865a84',
          url: '/Data/Weathers/Paris/Autumn-Winter',
          name: 'Autumn Winter',
          displayName: 'Autumn Winter',
          fields: {
            Title: createTextField('Autumn & Winter'),
            Duration: createTextField('Oct–Mar'),
            Image: createImageField(),
            Temperature: createTextField('3–15°C'),
            Description: createTextField(
              'Cooler weather, fewer crowds, festive winter atmosphere, and museum-friendly days'
            ),
          },
        },
      ],
    },
  }));
