import { FC } from 'react';
import { NextSeo, NextSeoProps, DefaultSeo } from 'next-seo';

const defaultSEO: NextSeoProps = {
    title: 'Home',
    titleTemplate: 'Fue Perfect Email App | %s',
    description:
        'The Fue Perfect Email App is a cross platform email templating client, commissioned by Fue Perfect, a multinational cosmetic surgery clinic.',
    openGraph: {
        type: 'website',
        url: 'https://fueperfect.anga.blue',
        site_name: 'Fue Perfect Email App',
        images: [
            {
                url: 'https://fueperfect.anga.blue/banner.png',
                width: 968,
                height: 309,
                alt: 'Fue Perfect Email App'
            }
        ]
    },
    twitter: {
        cardType: 'summary_large_image'
    },
    additionalMetaTags: [
        {
            name: 'msapplication-TileColor',
            content: '#136094'
        },
        {
            name: 'theme-color',
            content: '#136094'
        }
    ]
};

function populate(props: NextSeoProps = {}): NextSeoProps {
    const seo = { ...defaultSEO, ...props };
    // Populate
    seo.openGraph = {
        title: seo.title,
        description: seo.description,
        ...seo.openGraph
    };
    seo.twitter = {
        site: seo.openGraph.url,
        ...seo.twitter
    };
    return seo;
}

export const SEO: FC<NextSeoProps> = props => {
    const seo = populate(props);
    return <NextSeo {...seo} />;
};

export const DefaultSEO: FC = () => {
    const seo = populate();
    return <DefaultSeo {...seo} />;
};
