# �� Backroom Generator

An AI-powered storytelling tool that creates surreal and terrifying "backrooms" levels from any object or phrase. Each level includes lore, description, dangers, and a creepy story hook — optionally paired with an AI-generated image.

![Backroom Generator](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🧠 Use Cases

- **Horror/Creepypasta fans** looking for new ideas
- **Writers and ARG designers** building liminal universes  
- **TikTok/YouTube creators** generating horror content fast
- **Worldbuilders** who want infinite haunted spaces

## ⚙️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + shadcn/ui + Tailwind CSS
- **Backend**: Supabase (auth, RLS, saved levels)
- **AI**: OpenAI GPT-4o (text) + DALL·E 3 (images)
- **Deployment**: Vercel (optional)

## 🔑 Core Features

### ✨ Prompt Input
- Enter any object, phrase, or vibe (e.g., "vending machine", "soft buzzing", "mossy stairwell")
- Random prompt generator for inspiration
- Smart prompt validation and sanitization

### 🏚️ Backroom Level Output
- **Level Name + Number** (e.g., Level 173: The Breathing Hall)
- **Visual Environment Description** (detailed atmospheric description)
- **Hazards & Threats** (specific dangers and entities)
- **Lore** (origin stories, rumors, discovery logs)
- **Story Hook** (entry logs, survivor tapes, cryptic quotes)

### 🖼️ Image Generation
- Optional AI-generated images using DALL·E 3
- Atmospheric horror styling optimized for liminal spaces
- High-quality 1024x1024 resolution

### 📚 Wiki System
- Save levels to a shared public catalog
- Browse and explore community-generated levels
- Author attribution and creation timestamps
- Beautiful grid layout with previews

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Supabase account ([Sign up here](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paarad/27-backroom-generator.git
   cd 27-backroom-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys in `.env.local`:
   ```env
   # OpenAI API Key - Get from https://platform.openai.com/api-keys
   OPENAI_API_KEY=sk-your-openai-key-here
   
   # Supabase Configuration - Get from your Supabase project settings
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

4. **Set up Supabase database**
   
   Create a new table in your Supabase project:
   ```sql
   CREATE TABLE backroom_levels (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     level_number INTEGER,
     name TEXT NOT NULL,
     visual_description TEXT NOT NULL,
     hazards TEXT[] NOT NULL,
     lore TEXT NOT NULL,
     story_hook TEXT NOT NULL,
     image_url TEXT,
     author_name TEXT,
     prompt TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable Row Level Security
   ALTER TABLE backroom_levels ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access
   CREATE POLICY "Allow public read" ON backroom_levels
     FOR SELECT USING (true);
   
   -- Allow public insert
   CREATE POLICY "Allow public insert" ON backroom_levels
     FOR INSERT WITH CHECK (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

1. **Generate a Level**: Enter any prompt (object, phrase, vibe) and click "Generate"
2. **Create Image**: Click "Generate Image" to create a visual representation 
3. **Save to Wiki**: Add your name (optional) and save the level to the public catalog
4. **Browse Wiki**: Visit `/wiki` to explore all community-generated levels

## 🧪 Example Prompts

- `vending machine`
- `soft buzzing sound`
- `endless office cubicles`
- `flickering fluorescent lights`
- `wet concrete walls`
- `yellow wallpaper peeling`
- `liminal shopping mall`
- `infinite stairwell`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/            # API routes
│   │   ├── generate/   # Level generation
│   │   ├── generate-image/ # Image generation
│   │   └── levels/     # Save/fetch levels
│   ├── wiki/           # Wiki browsing page
│   └── page.tsx        # Main generator page
├── components/
│   ├── ui/             # shadcn/ui components
│   └── BackroomGenerator.tsx # Main generator component
├── lib/
│   ├── openai.ts       # OpenAI integration
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Utility functions
└── types/
    └── backroom.ts     # TypeScript types
```

## 🔧 Configuration

### OpenAI Settings
- Model: GPT-4o for text generation
- Image model: DALL-E 3 
- Temperature: 0.8 for creative variation
- Max tokens: 1000 for comprehensive levels

### Supabase Settings
- Row Level Security enabled
- Public read/insert policies
- Real-time subscriptions ready

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🧰 Bonus Features (Optional Expansions)

- **Random Level Generator**: Auto-generate levels without prompts
- **Embed Mode**: Embeddable widget for blogs/websites  
- **TikTok Export**: Level + audio + image bundling
- **Lore Expansion**: Add survivor logs, sightings, additional threats
- **Sound Layer**: Generate ambient audio from prompts
- **Level Linking**: Connect levels with "exits" and "entrances"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [Backrooms](https://en.wikipedia.org/wiki/The_Backrooms) creepypasta
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Powered by [OpenAI](https://openai.com/) and [Supabase](https://supabase.com/)

---

**⚠️ Content Warning**: This application generates horror content. Generated levels may contain descriptions of psychological horror, liminal spaces, and unsettling scenarios.
