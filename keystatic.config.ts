import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  collections: {
    // ── Blog Posts ──────────────────────────────────────────
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        author: fields.text({ label: 'Author', defaultValue: 'Admin' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        featuredImage: fields.image({ label: 'Featured Image', directory: 'public/images/posts' }),
        categories: fields.array(fields.text({ label: 'Category' }), { label: 'Categories', itemLabel: p => p.value }),
        content: fields.markdoc({ label: 'Content' }),
        // Per-post meta overrides
        breadcrumbVisible: fields.checkbox({ label: 'Show Breadcrumb', defaultValue: true }),
        headerLayoutType: fields.select({ label: 'Header Type', options: [{ label: 'Normal', value: 'normal' }, { label: 'Transparent', value: 'transparent' }], defaultValue: 'normal' }),
        featuredImageHidden: fields.checkbox({ label: 'Hide Featured Image', defaultValue: false }),
      },
    }),

    // ── fotisp-event CPT ────────────────────────────────────
    events: collection({
      label: 'Events (fotisp-event)',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        featuredImage: fields.image({ label: 'Featured Image', directory: 'public/images/events' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
        // fotisp_event_date (was ignition_event_date)
        fotispEventDate: fields.date({ label: 'Event Date' }),
        // fotisp_event_time
        fotispEventTime: fields.text({ label: 'Event Time', description: 'e.g. 14:00' }),
        // fotisp_event_location
        fotispEventLocation: fields.text({ label: 'Event Location' }),
        // fotisp_event_is_recurring
        fotispEventIsRecurring: fields.checkbox({ label: 'Recurring Event', defaultValue: false }),
        fotispEventRecurrence: fields.text({ label: 'Recurrence text', description: 'e.g. Every Other Tuesday' }),
        categorySlug: fields.text({ label: 'Category Slug' }),
      },
    }),

    // ── fotisp-portfolio CPT ────────────────────────────────
    portfolio: collection({
      label: 'Portfolio / Case Studies (fotisp-portfolio)',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        featuredImage: fields.image({ label: 'Featured Image', directory: 'public/images/portfolio' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        client: fields.text({ label: 'Client' }),
        categorySlug: fields.text({ label: 'Category' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    // ── fotisp-service CPT ──────────────────────────────────
    services: collection({
      label: 'Services (fotisp-service)',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        featuredImage: fields.image({ label: 'Featured Image', directory: 'public/images/services' }),
        icon: fields.text({ label: 'Icon (emoji or SVG path)' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    // ── fotisp-team CPT ─────────────────────────────────────
    team: collection({
      label: 'Team Members (fotisp-team)',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { contentField: 'bio' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role / Position' }),
        photo: fields.image({ label: 'Photo', directory: 'public/images/team' }),
        bio: fields.markdoc({ label: 'Bio' }),
        socialFacebook: fields.url({ label: 'Facebook URL' }),
        socialTwitter: fields.url({ label: 'Twitter URL' }),
        socialLinkedin: fields.url({ label: 'LinkedIn URL' }),
      },
    }),

    // ── fotisp-gsection (Global Sections) ───────────────────
    globalSections: collection({
      label: 'Global Sections (fotisp-gsection)',
      slugField: 'title',
      path: 'src/content/global-sections/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        location: fields.select({
          label: 'Location',
          options: [
            { label: 'Header', value: 'header' },
            { label: 'Sidebar', value: 'sidebar' },
            { label: 'Footer', value: 'footer' },
          ],
          defaultValue: 'header',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings',
      schema: {
        siteName: fields.text({ label: 'Site Name', defaultValue: 'fotisp' }),
        themeVariation: fields.select({
          label: 'Theme Variation',
          options: [{ label: 'Convert (Navy/Red)', value: 'convert' }, { label: 'Logico (Black/Purple)', value: 'logico' }],
          defaultValue: 'convert',
        }),
        topBarContent: fields.text({ label: 'Top Bar Text' }),
        footerCredits: fields.text({ label: 'Footer Credits' }),
        openWeathermapApiKey: fields.text({ label: 'OpenWeatherMap API Key' }),
        openWeathermapLocationId: fields.text({ label: 'OWM Location ID', defaultValue: '2643743' }),
      },
    }),

    navigation: singleton({
      label: 'Navigation Menu',
      path: 'src/content/navigation',
      schema: {
        mainMenu: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'URL' }),
            isButton: fields.checkbox({ label: 'Show as button', defaultValue: false }),
          }),
          { label: 'Menu Items', itemLabel: p => p.fields.label.value || 'Item' }
        ),
      },
    }),
  },
});
