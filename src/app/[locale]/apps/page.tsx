import { Flex } from "@/once-ui/components";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AppCard, AppType } from "@/components/apps/AppCard";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { apps } = renderContent(t);

  const title = apps.title;
  const description = apps.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/apps/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Apps({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();
  const { person, apps } = renderContent(t);

  return (
    <Flex fillWidth maxWidth='s' direction='column'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: apps.title,
            description: apps.description,
            url: `https://${baseURL}/apps`,
            image: `${baseURL}/og?title=Apps`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      {apps.all.map((app: AppType) => (
        <AppCard app={app} key={app.name} />
      ))}
    </Flex>
  );
}
