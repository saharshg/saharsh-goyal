import { getPosts } from '@/app/utils/utils';
import { Flex, Heading, Text } from '@/once-ui/components';
// import { Projects } from '@/components/work/Projects';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { work } = renderContent(t);

  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  //   let allProjects = getPosts([
  //     'src',
  //     'app',
  //     '[locale]',
  //     'work',
  //     'projects',
  //     locale,
  //   ]);

  const t = useTranslations();
  const { person, work, about } = renderContent(t);

  return (
    <Flex fillWidth maxWidth='s' direction='column'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
            // hasPart: allProjects.map((project) => ({
            //   '@type': 'CreativeWork',
            //   headline: project.metadata.title,
            //   description: project.metadata.summary,
            //   url: `https://${baseURL}/projects/${project.slug}`,
            //   image: `${baseURL}/${project.metadata.image}`,
            // })),
          }),
        }}
      />

      {about.work.display && (
        <>
          <Heading
            as='h2'
            id={about.work.title}
            variant='display-strong-s'
            marginBottom='m'
          >
            {about.work.title}
          </Heading>
          <Flex direction='column' fillWidth gap='l' marginBottom='40'>
            {about.work.experiences.map((experience, index) => (
              <Flex
                key={`${experience.company}-${experience.role}-${index}`}
                fillWidth
                direction='column'
              >
                <Flex
                  fillWidth
                  justifyContent='space-between'
                  alignItems='flex-end'
                  marginBottom='4'
                >
                  <Text id={experience.company} variant='heading-strong-l'>
                    {experience.company}
                  </Text>
                  <Text
                    variant='heading-default-xs'
                    onBackground='neutral-weak'
                  >
                    {experience.timeframe}
                  </Text>
                </Flex>
                <Text
                  variant='body-default-s'
                  onBackground='brand-weak'
                  marginBottom='m'
                >
                  {experience.role}
                </Text>
                <Flex as='ul' direction='column' gap='16'>
                  {experience.achievements.map(
                    (achievement: string, index: any) => (
                      <Text
                        as='li'
                        variant='body-default-m'
                        key={`${experience.company}-${index}`}
                      >
                        {achievement}
                      </Text>
                    )
                  )}
                </Flex>
                {/* {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop='m' paddingLeft='40' wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border='neutral-medium'
                            borderStyle='solid-1'
                            radius='m'
                            minWidth={image.width}
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius='m'
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )} */}
              </Flex>
            ))}
          </Flex>
        </>
      )}

      {/* <Projects locale={locale}/> */}
    </Flex>
  );
}
