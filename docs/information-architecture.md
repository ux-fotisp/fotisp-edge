# EDGE — Information Architecture & OOUX Evaluation

**Author**: Senior UX Designer  
**UX Methodology**: Object-Oriented User Experience (OOUX / ORCA Model by Sophia Prater)  
**Target Platform**: EDGE Platform (Astro 5.x / 7.x Content Layer & Cloudflare Pages)  

---

## 1. Executive Summary & OOUX Paradigm Shift

Traditional user experience design frequently defaults to **verb-first** or **screen-first** methodologies—jumping straight to procedural user flows, wireframes, and button actions before establishing a solid domain model. In complex, high-stakes technical platforms like **EDGE**, this procedural approach leads to duplicated logic, broken mental models, fragmented navigation, and content isolated in dead-end pages.

Following **Sophia Prater’s Object-Oriented User Experience (OOUX)** framework, this document synthesizes and evaluates the entire architecture of the EDGE platform using the 4-stage **ORCA** model:

```
+-----------------------------------------------------------------------------------+
|                            THE ORCA PROCESS (OOUX)                               |
|                                                                                   |
|   1. OBJECTS          2. RELATIONSHIPS      3. CALLS TO ACTION     4. ATTRIBUTES    |
|   Identify core       Map links & nested    Define object-driven   Define core, meta|
|   system entities     card connections      user actions/verbs     & nested schema  |
+-----------------------------------------------------------------------------------+
```

By anchoring the platform in concrete, real-world **Objects** first (rather than abstract screens), EDGE achieves:
- **Zero-Redundancy Navigation**: Object-oriented cross-linking where users move seamlessly between related entities (e.g., Event $\rightarrow$ Speaker $\rightarrow$ Author $\rightarrow$ Post $\rightarrow$ Service).
- **Type-Safe Data Schema**: Direct mapping between OOUX Object schemas and Astro 7 Content Layer collections (`src/content.config.ts`).
- **Mental Model Alignment**: UI components directly reflect how users perceive technical services, case studies, strategy events, and engineering personnel.

---

## 2. ORCA Step 1: Object Discovery (The System Nouns)

Through detailed analysis of the EDGE codebase and architecture, six core **Domain Objects** have been identified:

```
+-----------------------------------------------------------------------------------+
|                              EDGE DOMAIN OBJECTS                                  |
|                                                                                   |
|  [ 1. Event ]         [ 2. Service ]        [ 3. Portfolio / Case Study ]        |
|  Strategy session,    Infrastructure &      Engineering mission reports           |
|  webinar, or summit   consulting offering   & client deliverables                 |
|                                                                                   |
|  [ 4. Post / Article ] [ 5. Team Member ]    [ 6. Access Request / Contact ]      |
|  Editorial insight    Operational leader,   Interactive lead entity &             |
|  & tech breakdown     speaker, or author    permission drawer submission          |
+-----------------------------------------------------------------------------------+
```

### 2.1 Object 1: `Event`
- **Definition**: A live, hybrid, or virtual strategy gathering, technical summit, webinar, or recurring engineering session hosted by the platform team.
- **User Mental Model**: A scheduled calendar event with defined time slots, location/virtual links, finite seat capacity, key agenda topics, and featured speakers.
- **Lifecycle States**: `UPCOMING`, `LIVE`, `COMPLETED`, `RECURRING`.
- **Event Types**: `VIRTUAL`, `HYBRID`, `IN_PERSON`.
- **Astro Collection Target**: `src/content/events/*.mdx`

### 2.2 Object 2: `Service`
- **Definition**: A primary consulting capability, architecture audit, or infrastructure solution provided by EDGE.
- **User Mental Model**: A service offering detailing technical scope, features, specs, implementation process, and business value.
- **Lifecycle States**: `ACTIVE`, `FEATURED`, `DEPRECATED`.
- **Astro Collection Target**: `src/content/services/*.mdx`

### 2.3 Object 3: `Portfolio / Case Study`
- **Definition**: A concrete mission report or case study demonstrating how an EDGE service solved a complex engineering or operational challenge for a client.
- **User Mental Model**: A proof-of-work artifact containing measurable metrics, tech stack pills, architecture visuals, and client testimonials.
- **Lifecycle States**: `PUBLISHED`, `FEATURED`, `ARCHIVED`.
- **Astro Collection Target**: `src/content/portfolio/*.mdx`

### 2.4 Object 4: `Post / Article`
- **Definition**: An editorial post, architectural teardown, or industry analysis written by an internal engineering leader or author.
- **User Mental Model**: An article focused on single-column readability with estimated reading time, pub date, category tags, and scroll progress tracking.
- **Lifecycle States**: `DRAFT`, `PUBLISHED`.
- **Astro Collection Target**: `src/content/posts/*.mdx`

### 2.5 Object 5: `Team Member / Speaker / Author`
- **Definition**: An operational leader, domain expert, or engineer who delivers services, authors editorial posts, or presents at strategy events.
- **User Mental Model**: A person profile featuring professional title, avatar photo, biography, social links, and lists of authored posts or presented events.
- **Lifecycle States**: `ACTIVE`, `ALUMNI`.
- **Astro Collection Target**: `src/content/team/*.mdx`

### 2.6 Object 6: `Access Request / Lead`
- **Definition**: An interactive engagement object created when a user requests system access, requests a service quote, or submits terminal inquiry forms.
- **User Mental Model**: A secure terminal transaction containing request details, user credentials, service target, and validation status.
- **Lifecycle States**: `UNSUBMITTED`, `VALIDATING`, `SUBMITTED`, `VERIFIED`.
- **Component Target**: `AccessModal.astro` & Contact Forms

---

## 3. ORCA Step 2: Nested Object Relationships (The Matrix)

In OOUX, objects do not exist in isolation. The strength of the information architecture lies in **nested object relationships**, ensuring users never hit dead ends and can navigate fluidly along logical domain connections.

### 3.1 Object Relationship Matrix

| Primary Object | Related Object | Cardinality | Relationship Nature & UX Touchpoint |
|---|---|---|---|
| **Event** | **Team Member (Speaker)** | 1 : N (or N : M) | An Event features 1 or more Speakers; clicking a Speaker links to their Team Profile. |
| **Event** | **Location (Nested)** | 1 : 1 | An Event has 1 physical or virtual location with map address or virtual URL. |
| **Event** | **Agenda Item (Nested)**| 1 : N | An Event contains a sequential agenda timeline with assigned sub-topics & speakers. |
| **Service** | **Portfolio Item** | 1 : N | A Service showcases 1 or more real-world Case Studies proving its efficacy. |
| **Service** | **Access Request** | 1 : N | Requesting access from a Service page pre-populates the Access Modal with that Service context. |
| **Portfolio Item**| **Team Member** | N : M | Case Studies feature the lead engineers and team members who delivered the mission. |
| **Post / Article** | **Team Member (Author)** | N : 1 | Each Article is authored by a Team Member; author avatar links to bio & past articles. |
| **Post / Article** | **Service / Portfolio** | N : M | Editorial articles link to related Services or Case Studies mentioned in text. |

### 3.2 Circular Object Navigation & Non-Linear Pathways

```
               +-----------------------+
               |      Service          |
               +-----------+-----------+
                           |
            Showcases      |      Contextual CTAs
            Case Studies   |      Trigger Access
                           v
+--------------------------+--------------------------+
|  Portfolio / Case Study  |  Access Request Modal    |
+------------+-------------+--------------------------+
             |
   Built By  |  Authored By / Presented By
   Engineers |
             v
+------------+-------------+
|  Team Member / Speaker   |
+------------+-------------+
             |
   Presents  |  Authors
   Events    |  Posts
             v
+------------+-------------+--------------------------+
|         Event            |     Post / Article       |
+--------------------------+--------------------------+
```

---

## 4. ORCA Step 3: Calls to Action (CTAs per Object)

In OOUX, Actions are **strictly object-dependent**. Instead of scattering generic "Click Here" buttons across screens, every Call to Action is scoped to the specific Object the user is engaging with:

### 4.1 Actions on `Event`
- **`Register for Event`**: Triggers registration flow or opens external RSVP portal.
- **`Add to Calendar`**: Generates `.ics` download or Google Calendar link based on `eventDate` and `timeSlot`.
- **`Filter Archive`**: Toggles event archive view by status (`Upcoming`, `Recurring`, `Past`).
- **`Download Agenda`**: Exports structured event schedule as PDF/text.
- **`Share Event`**: Copies canonical event URL to clipboard with confirmation tooltip.

### 4.2 Actions on `Service`
- **`Request Access / Consult`**: Opens the `AccessModal` pre-configured for the active service ID.
- **`Inspect Specifications`**: Toggles deep technical accordions (`#overview`, `#specs`, `#pricing`).
- **`Explore Related Case Studies`**: Filters Portfolio grid by matching service category tag.

### 4.3 Actions on `Portfolio Item / Case Study`
- **`View Live Metric Grid`**: Interactively inspects scarlet key performance indicators.
- **`Filter by Tech Stack`**: Toggles portfolio filter based on tech stack pill badge (e.g., Astro, Cloudflare D1, KV).
- **`Request Similar Architecture`**: Opens `AccessModal` with case study baseline reference.

### 4.4 Actions on `Post / Article`
- **`Read Article`**: Initiates reader flow with scroll depth tracked via `#read-progress`.
- **`Filter by Category`**: Views all articles under a shared topic tag.
- **`Copy Article Link`**: Copies permalink with visual feedback signifier.

### 4.5 Actions on `Access Request Modal`
- **`Submit Terminal Form`**: Validates monospace input fields and sends telemetry payload.
- **`Validate Monospace Field`**: Triggers real-time inline blur check (email format, required fields).
- **`Dismiss Terminal Drawer`**: Closes drawer via `Escape` key, backdrop click, or close icon.

---

## 5. ORCA Step 4: Object Attributes Schema Matrix

Each Object consists of **Core Attributes** (primary visual content), **Metadata Attributes** (taxonomy & system flags), and **Nested Composite Objects** (structured sub-entities).

```
+-----------------------------------------------------------------------------------+
|                         ATTRIBUTE CLASSIFICATION ENGINE                           |
|                                                                                   |
|  CORE ATTRIBUTES         METADATA ATTRIBUTES       NESTED OBJECT ARRAYS           |
|  Title, Excerpt, Content, Slug, PubDate, Category, Speakers Array, Agenda Array,  |
|  Images, Metrics         Status, Draft Flag        Capacity & Location Objects    |
+-----------------------------------------------------------------------------------+
```

### 5.1 Object Attribute Breakdown Table

| Object | Attribute Name | Type | OOUX Classification | Description / Requirement |
|---|---|---|---|---|
| **Event** | `title` | String | Core Attribute | Primary headline of the event |
| | `tagline` | String | Core Attribute | Subordinate descriptor for hero banner |
| | `excerpt` | String | Core Attribute | Brief summary for `EventCard` archive display |
| | `eventDate` | Date String | Core Attribute | Event date (YYYY-MM-DD) |
| | `endDate` | Date String | Core Attribute | End date for multi-day summits |
| | `timeSlot` | String | Core Attribute | Human-readable time range (e.g., "18:00 – 20:30 UTC") |
| | `status` | Enum | Metadata Attribute | `UPCOMING` \| `LIVE` \| `COMPLETED` \| `RECURRING` |
| | `category` | Enum | Metadata Attribute | `Upcoming` \| `Recurring` \| `Past` |
| | `eventType` | Enum | Metadata Attribute | `VIRTUAL` \| `HYBRID` \| `IN_PERSON` |
| | `capacity` | Composite Object| Nested Object | `{ totalSeats: Number, registeredCount: Number }` |
| | `location` | Composite Object| Nested Object | `{ name: String, address: String, virtualLink: String }` |
| | `speakers` | Array of Objects| Nested Object Array | `[{ name, role, company, avatar }]` |
| | `agenda` | Array of Objects| Nested Object Array | `[{ time, topic, speakerName, description }]` |
| | `keyTakeaways`| Array of Strings| Core Attribute | Bullet points rendered in sticky sidebar |
| | `draft` | Boolean | System Flag | Hides unpublished entries from archive |
| **Service** | `title` | String | Core Attribute | Service title |
| | `excerpt` | String | Core Attribute | Summary of technical capability |
| | `icon` | String | Core Attribute | Emoji or SVG path identifier |
| | `order` | Number | Metadata Attribute | Display sorting priority |
| | `featuredImage`| String | Core Attribute | Hero diagram image path |
| **Portfolio**| `title` | String | Core Attribute | Case study headline |
| | `excerpt` | String | Core Attribute | Mission outcome summary |
| | `client` | String | Core Attribute | Client name or classified codename |
| | `category` | String | Metadata Attribute | Category grouping tag |
| | `publishedAt`| Date String | Metadata Attribute | Completion date |
| **Post** | `title` | String | Core Attribute | Article title |
| | `excerpt` | String | Core Attribute | Post excerpt |
| | `author` | String / Ref | Relationship Ref | Team Member author reference |
| | `publishedAt`| Date String | Metadata Attribute | Publication date |
| | `categories` | Array of Strings| Metadata Attribute | Topic classification tags |
| **Team** | `name` | String | Core Attribute | Personnel full name |
| | `role` | String | Core Attribute | Title / Position |
| | `photo` | String | Core Attribute | Avatar image path |
| | `social` | Composite Object| Nested Object | `{ linkedin, twitter, facebook }` |

---

## 6. Object Representation & UI Hierarchy Matrix

In OOUX, objects manifest across different sizes and view contexts depending on user intent:

```
+-----------------------------------------------------------------------------------+
|                        OBJECT VIEW REPRESENTATION TIERS                           |
|                                                                                   |
|  TIER 1: MINI BADGE       TIER 2: OBJECT CARD         TIER 3: DETAIL ARCHETYPE     |
|  Pill / Avatar tag        Archive card component      Full-page interactive        |
|  (Inline metadata)        (Grid view representation)  archetype layout             |
+-----------------------------------------------------------------------------------+
```

### 6.1 Representation Tier Table

| Object | Tier 1: Mini Badge / Pill | Tier 2: Object Card (Grid) | Tier 3: Detail Archetype Page |
|---|---|---|---|
| **Event** | Monospace Date & Status Pill (`EntryListMeta.astro`) | Rich card with avatar initials & capacity bar (`EventCard.astro`) | Archetype D: 70/30 split layout with sticky conversion sidebar (`events/[slug].astro`) |
| **Service** | Service Icon & Title Pill | Card with hover border elevation (`ServiceCard.astro`) | Archetype C: 70/30 split layout with section anchor tracking (`services/[...slug].astro`) |
| **Portfolio**| Tech Stack Pill Tag | Full grid card with scarlet metric preview (`PortfolioCard.astro`) | Archetype B: 1200px full grid with scarlet numbers & visual panel (`portfolio/[...slug].astro`) |
| **Post** | Author Initials & Reading Time | Editorial card with category tag (`ArticleCard.astro`) | Archetype A: 720px reader column with `#read-progress` bar (`blog/[...slug].astro`) |
| **Team** | Speaker Avatar Circle | Team grid card with social handles | Dedicated team profile layout / Author bio modal |

---

## 7. URL Taxonomy & Information Hierarchy

To maintain complete parity between the OOUX domain model and site navigation, the URL routing taxonomy maps strictly to object collections:

```
/                            --> Homepage (System Summary & Object Highlights)
├── /events                  --> Event Object Archive (Upcoming, Recurring, Past)
│   └── /events/[slug]       --> Event Object Detail Page (Archetype D)
├── /services                --> Service Object Matrix
│   └── /services/[slug]     --> Service Object Detail Page (Archetype C)
├── /portfolio               --> Portfolio Object Grid
│   └── /portfolio/[slug]    --> Portfolio Object Detail Page (Archetype B)
├── /blog                    --> Article Object Feed
│   └── /blog/[slug]         --> Article Object Detail Page (Archetype A)
├── /team                    --> Team Member Object Directory
└── /contact                 --> Terminal Access Request Page
```

---

## 8. Summary & UX Recommendations

1. **Strict Relationship Enforcing**: Maintain bidirectional linking between `Speakers` on `Events` and `Team Members` profiles so users can explore speaker credentials seamlessly.
2. **Schema Uniformity**: Ensure all new MDX content additions strictly validate against `src/content.config.ts` Zod schemas to preserve card component rendering parity.
3. **Contextual Access Triggering**: Preserve the pattern of passing object context (e.g. `serviceId` or `eventId`) into the `AccessModal` drawer for higher conversion relevance.
