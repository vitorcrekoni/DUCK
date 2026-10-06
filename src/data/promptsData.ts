export interface PromptItem {
  id: string;
  title: string;
  postNumber?: string;
  category:
    | 'carro-na-cena'
    | 'tiktok-shop'
    | 'academia'
    | 'influencer-academia'
    | 'influencer-corredora'
    | 'influencer'
    | 'influencer-produto'
    | 'influencer-podcast'
    | 'fotos'
    | 'fotos-livres'
    | 'macro-zoom'
    | 'video'
    | 'videos'
    | 'influencer-no-role-noite'
    | 'all';
  additionalCategories?: string[];
  categoryLabel: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
  videoUrl?: string;
  prompt: string;
  negativePrompt?: string;
  recommendedModel: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5';
  tags: string[];
  motionType?: string;
}

export interface PromptCategoryConfig {
  id: string;
  label: string;
  isNew?: boolean;
  badge?: string;
  tag?: string;
}

export const PROMPT_CATEGORIES: PromptCategoryConfig[] = [
  { id: 'all', label: 'Todos' },
  { id: 'carro-na-cena', label: 'Carro Na Cena', badge: 'Exclusivo' },
  { id: 'tiktok-shop', label: 'Tiktok Shop', isNew: true },
  { id: 'academia', label: 'Academia' },
  { id: 'fotos', label: 'Fotos' },
  { id: 'influencer', label: 'Influencer' },
  { id: 'influencer-no-role-noite', label: 'Influencer no Rolê Noite', isNew: true },
  { id: 'videos', label: 'Videos' },
];

export const PROMPTS_DATA: PromptItem[] = [
  // ==========================================
  // POST 01: IMAGEM - LUXURY WATCH REVIEW UGC
  // ==========================================
  {
    id: 'ugc-luxury-watch-text',
    postNumber: '01',
    title: 'TikTok Shop Luxury Watch Review',
    category: 'tiktok-shop',
    categoryLabel: 'Tiktok Shop',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img01prompt.webp',
    posterUrl: '/imagensprompt/img01prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical UGC content for TikTok Shop luxury watch review. A gloved hand in a white inspection glove delicately holds a luxury stainless steel chronograph watch with an octagonal brushed bezel secured by 8 hexagonal screws, a deep blue waffle tapisserie dial, three chronograph subdials (at 12, 6, and 9 o\'clock), date window at 4:30, applied steel hour indices, and an integrated stainless steel bracelet. The watch is the hero of the frame, shot in first-person POV macro smartphone style at approximately 25 cm from the camera, filling the vertical frame. In the softly blurred background, a natural oak wooden watchmaker workbench with precision screwdrivers and tweezers rests on a dark work mat. Soft professional product lighting creates crisp specular highlights along the polished bevels and subtle brushed textures. Swiss horology luxury aesthetic, iPhone 15 Pro Max macro photography, photorealistic, maximum metallic detail, no watermark.',
    negativePrompt:
      'blurry, distorted watch, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, logos, low resolution',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Luxury Watch', 'Macro POV', 'UGC', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 02: VÍDEO - LUXURY WATCH REVIEW UGC
  // ==========================================
  {
    id: 'ugc-luxury-watch-video',
    postNumber: '02',
    title: 'TikTok Shop Luxury Watch Review',
    category: 'tiktok-shop',
    additionalCategories: ['videos'],
    categoryLabel: 'Tiktok Shop',
    mediaType: 'video',
    mediaUrl: '/imagensprompt/vid02prompt.mp4',
    posterUrl: '/imagensprompt/img01prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical UGC video for TikTok Shop luxury watch review. First-person POV (point-of-view) macro shot, as if filmed by the reviewer holding the watch in front of their own smartphone camera at approximately 25-30 cm. A white gloved hand naturally holds the watch steady in the center of the vertical frame, while the thumb gently slides across the octagonal brushed bezel edge and the index finger lightly touches the integrated stainless steel bracelet links. The watch is the hero: premium stainless steel chronograph with octagonal brushed bezel, deep blue waffle textured dial, three chronograph subdials, applied polished steel indices, polished skeleton hands, signed crown and pushers, integrated bracelet with alternating brushed and polished links. Preserve exact dial orientation, hands, bezel screws, case brushing, polishing, proportions and every visible detail. Subtle breathing motion creates a slight handheld camera sway, like a real person filming close-up. Soft professional product lighting from overhead large softbox, front-left with top fill, producing crisp specular highlights on polished bevels and broad reflections on brushed surfaces. Natural oak watchmaker bench and blurred watchmaking tools softly out of focus in the background. Luxury watch boutique atmosphere, quiet luxury aesthetic, Swiss horology vibe, premium craftsmanship. No dialogue, no visible face, no text overlay, no watermark, no logos other than the watch\'s own signed crown. iPhone 15 Pro Max macro video style, Apple Smart HDR, Deep Fusion, maximum metallic detail, photorealistic, cinematic shallow depth of field, smooth handheld micro-movements.',
    negativePrompt:
      'blurry, distorted watch, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, logos, low resolution, camera jitter, abrupt cuts, low framerate',
    recommendedModel: 'Kling AI 1.5 / Runway Gen-3 / Hailuo Minimax',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Watch Video', 'POV Macro', 'Handheld Motion', 'Swiss Horology'],
    motionType: 'POV Handheld Micro-Movements',
  },

  // ==========================================
  // POST 03: IMAGEM - LUXURY FASHION SHOWCASE
  // ==========================================
  {
    id: 'ugc-luxury-fashion-turtleneck',
    postNumber: '03',
    title: 'TikTok Shop Luxury Fashion Showcase',
    category: 'tiktok-shop',
    categoryLabel: 'Tiktok Shop',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img03prompt.webp',
    posterUrl: '/imagensprompt/img03prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical UGC content for TikTok Shop luxury fashion showcase. First-person POV medium close-up of a faceless female boutique mannequin in matte warm ivory fiberglass, framed from the upper thighs to just above the shoulders, head fully cropped out of frame, body perfectly centered, camera about 80 cm away at chest level. Monochromatic chocolate brown luxury outfit: slim fit fitted turtleneck in premium stretch fine rib knit with a soft matte finish, and an espresso brown premium faux leather mini skirt with a soft satin leather sheen. A layered polished gold heart-link waist chain belt drapes naturally over the waist with realistic gravity. One single hand enters from the bottom-left corner, light neutral skin tone, short clean nails, no rings, no bracelets, no watch, with the thumb and index finger gently pinching and stretching the turtleneck fabric to demonstrate softness and elasticity, knit fibers and natural tension clearly visible. Minimal luxury boutique environment: organic backlit mirror with a warm LED outline on the left, gold clothing rack with neutral brown, beige, cream and black garments on the right, warm white decorative moulding wall behind. Luxury boutique ambient lighting at about 3300K, very soft, low contrast, warm ceiling light plus mirror LED and soft fill, soft premium retail shadows. iPhone 15 Pro Max rear camera, 26mm lens, vertical orientation, focus on the center chest fabric, entire outfit sharp with very subtle background blur, ISO 100, 1/120, HDR on, warm indoor white balance, Apple Smart HDR, Deep Fusion, natural sharpening, maximum fabric and texture realism. Quiet luxury, old money, Pinterest fashion, editorial product aesthetic. No bag, no boots, no visible head or face, no multiple hands, no plastic looking fabric, no oversaturation, no CGI or 3D render look, no motion blur, no extra fingers, no text, no watermark.',
    negativePrompt:
      'blurry, distorted mannequin, bad hands, extra fingers, plastic looking fabric, bag, boots, head, face, multiple hands, oversaturation, CGI, 3D render, cartoon, watermark, text overlay, low resolution',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Fashion UGC', 'Turtleneck', 'Quiet Luxury', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 04: VÍDEO - LUXURY FASHION SHOWCASE
  // ==========================================
  {
    id: 'ugc-luxury-fashion-turtleneck-video',
    postNumber: '04',
    title: 'TikTok Shop Luxury Fashion Showcase',
    category: 'tiktok-shop',
    additionalCategories: ['videos'],
    categoryLabel: 'Tiktok Shop',
    mediaType: 'video',
    mediaUrl: '/imagensprompt/vid04prompt.mp4',
    posterUrl: '/imagensprompt/img03prompt.webp',
    prompt:
      'POV (first-person perspective). Follow the reference image exactly. The hand slowly pinches the fabric near the waist, gently lifting it a few millimeters before releasing it naturally. Then the fingertips softly brush across the front of the garment, highlighting the premium knit texture. The camera leans slightly closer during the inspection with realistic handheld micro-shakes. No dialogue.',
    negativePrompt:
      'blurry, distorted, camera jitter, abrupt cuts, low framerate, extra hands, plastic looking fabric, logos, watermark, text overlay, low resolution',
    recommendedModel: 'Kling AI 1.5 / Runway Gen-3 / Hailuo Minimax',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Fashion Video', 'POV UGC', 'Fabric Inspection', 'Handheld Motion'],
    motionType: 'POV Handheld Fabric Inspection',
  },

  // ==========================================
  // POST 05: IMAGEM - SNEAKER BOUTIQUE UGC
  // ==========================================
  {
    id: 'ugc-sneakers-pink',
    postNumber: '05',
    title: 'TikTok Shop Sneaker Boutique Showcase',
    category: 'tiktok-shop',
    categoryLabel: 'Tiktok Shop',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img05prompt.webp',
    posterUrl: '/imagensprompt/img05prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical iPhone POV photograph inside a premium sneaker boutique, TikTok Shop and Pinterest shopping aesthetic. A woman\'s left hand with light warm beige skin, short rounded natural nude nails, a thin gold bracelet and minimal gold rings (including a delicate heart-shaped ring) holds a vibrant magenta pink suede platform sneaker close to the camera at approximately 35 cm. The sneaker is the hero: premium suede upper in vibrant magenta pink, large cream white leather side stripe, small metallic gold logo on lateral panel, wide flat matching pink laces, padded tongue, chunky cream rubber platform sole with vertical ribbed texture, brand new pristine condition. The woman is seated wearing relaxed white jogger sweatpants and white crew socks, with the matching pair of sneakers on her feet, the right shoe still carrying a bright red retail tag. Behind the held shoe, an open natural kraft shoebox with orange side branding and white tissue paper sits on the light gray textured commercial carpet, with the second sneaker partially visible inside at a diagonal angle. A semi-transparent frosted plastic dust bag rests between the held shoe and the shoebox. Bright indoor retail LED lighting from large overhead panels, soft overhead diffuse light, low contrast, very soft shadows, color temperature 4600K. iPhone 15 Pro Max rear camera, 24mm equivalent, vertical orientation, camera at chest level while seated, pitch -55 degrees downward, centered yaw, object priority autofocus on the held sneaker, very subtle natural smartphone background blur, Apple Smart HDR, Deep Fusion, natural sharpening, minimal noise reduction, true color reproduction. Premium fashion retail photography, UGC shopping content, authentic sneaker culture moment, playful premium casual mood. No watch, no smartwatch, no large jewelry, no dirty shoes, no plastic texture, no anime, no illustration, no CGI, no 3D render, no oversaturated colors, no motion blur, no bad anatomy, no extra fingers, no text overlay, no watermark, no compression artifacts.',
    negativePrompt:
      'blurry, watch, smartwatch, large jewelry, dirty shoes, plastic texture, anime, illustration, CGI, 3D render, oversaturated colors, motion blur, bad anatomy, extra fingers, text overlay, watermark, compression artifacts',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Sneaker Boutique', 'Platform Sneaker', 'POV Shopping', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 06: VÍDEO - SNEAKER BOUTIQUE UGC
  // ==========================================
  {
    id: 'ugc-sneakers-pink-video',
    postNumber: '06',
    title: 'TikTok Shop Sneaker Boutique Showcase',
    category: 'tiktok-shop',
    additionalCategories: ['videos'],
    categoryLabel: 'Tiktok Shop',
    mediaType: 'video',
    mediaUrl: '/imagensprompt/vid06prompt.mp4',
    posterUrl: '/imagensprompt/img05prompt.webp',
    prompt:
      'POV (first-person perspective). Follow the reference image exactly. Keep the shoe perfectly aligned without rotating, flipping, or changing its angle. The hand naturally holds the shoe while making slow, confident grip adjustments. The shoe gently sways with realistic hand movement as the camera exhibits subtle handheld micro-shakes and breathing motion. End with the shoe centered in the same position as the reference image. No dialogue.',
    negativePrompt:
      'blurry, distorted, camera jitter, abrupt cuts, low framerate, rotation, flip, low resolution, watermark, text overlay',
    recommendedModel: 'Kling AI 1.5 / Runway Gen-3 / Hailuo Minimax',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Sneaker Video', 'POV Motion', 'Handheld Motion', 'Product UGC'],
    motionType: 'POV Handheld Grip Adjustment',
  },

  // ==========================================
  // POST 07: IMAGEM - LUXURY HANDBAG UNBOXING
  // ==========================================
  {
    id: 'ugc-luxury-handbag-unboxing',
    postNumber: '07',
    title: 'TikTok Shop Luxury Handbag Unboxing',
    category: 'tiktok-shop',
    categoryLabel: 'Tiktok Shop',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img07prompt.webp',
    posterUrl: '/imagensprompt/img07prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical top-down flat lay smartphone photograph of a luxury handbag unboxing, TikTok Shop and Pinterest quiet luxury aesthetic. Hero product: a brand new mini designer handbag in warm taupe beige (#C6B49C) premium smooth calf leather, rounded structured silhouette, front flap with a semi-circle tab closure, short rounded top handle, fine tonal stitching, hand-painted smooth edges, soft matte leather with a subtle satin sheen and a very subtle small embossed logo centered near the bottom front. Two feminine hands with light warm beige skin gently lift the handbag out of the box, short rounded almond nails with solid glossy white polish, wearing a yellow gold bracelet watch, a thin gold chain bracelet, a silver tennis bracelet and minimal gold stacking rings. Packaging: rigid matte white luxury magnetic presentation box, white tissue paper with a repeated minimal monogram print naturally folded around the product, warm ivory cotton canvas dust bag partially visible at the bottom left. The whole scene rests on a long-pile cream faux fur rug, with a neutral dried botanical arrangement in the upper right corner: dried wheat, preserved baby\'s breath, dried grasses and neutral pampas textures. Soft natural late morning window light from the upper left at 45 degrees, very soft diffuse, low contrast, soft feathered shadows, 5600K. iPhone 15 Pro Max rear camera, 24mm equivalent, perfect overhead flat lay at -90 degrees, about 70 cm from the subject, vertical framing, centered composition with symmetrical hands, entire handbag in focus, minimal background blur, ISO 64, 1/160, natural daylight white balance, HDR on, Apple Smart HDR, Deep Fusion, natural sharpening, maximum leather and fabric texture detail. Warm neutral palette of cream, beige, ivory and subtle gold. No plastic looking leather, no cheap packaging, no messy composition, no long fake nails, no oversaturated colors, no CGI or 3D render look, no motion blur, no bad anatomy, no extra fingers, no text overlay, no watermark.',
    negativePrompt:
      'blurry, plastic looking leather, cheap packaging, messy composition, long fake nails, oversaturated colors, CGI, 3D render look, motion blur, bad anatomy, extra fingers, text overlay, watermark',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Handbag Unboxing', 'Quiet Luxury', 'Flat Lay POV', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 08: VÍDEO - LUXURY HANDBAG UNBOXING
  // ==========================================
  {
    id: 'ugc-luxury-handbag-unboxing-video',
    postNumber: '08',
    title: 'TikTok Shop Luxury Handbag Unboxing',
    category: 'tiktok-shop',
    additionalCategories: ['videos'],
    categoryLabel: 'Tiktok Shop',
    mediaType: 'video',
    mediaUrl: '/imagensprompt/vid08prompt.mp4',
    posterUrl: '/imagensprompt/img07prompt.webp',
    prompt:
      'POV (first-person perspective). Follow the reference image exactly. Keep the handbag perfectly front-facing without rotating, flipping, or changing its angle. One hand gently glides across the leather surface, lightly pressing the flap and tracing the stitching with slow, natural movements. The other hand keeps the bag stable. Realistic leather response, subtle handheld camera sway, and premium human motion. No dialogue.',
    negativePrompt:
      'blurry, distorted, camera jitter, abrupt cuts, low framerate, rotation, flip, low resolution, watermark, text overlay',
    recommendedModel: 'Kling AI 1.5 / Runway Gen-3 / Hailuo Minimax',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Handbag Video', 'POV UGC', 'Texture Glide', 'Handheld Motion'],
    motionType: 'POV Leather Surface Glide',
  },

  // ==========================================
  // POST 09: IMAGEM - LUXURY MENSWEAR POLO UGC
  // ==========================================
  {
    id: 'ugc-luxury-menswear-polo',
    postNumber: '09',
    title: 'TikTok Shop Luxury Menswear Polo Showcase',
    category: 'tiktok-shop',
    categoryLabel: 'Tiktok Shop',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img09prompt.webp',
    posterUrl: '/imagensprompt/img09prompt.webp',
    prompt:
      'Ultra-realistic 9:16 vertical iPhone POV photograph inside a luxury menswear boutique, TikTok Shop quiet luxury aesthetic. Two white-gloved hands elegantly present a premium black short-sleeve mercerized cotton polo shirt toward the camera at approximately 40 cm. The polo is the hero: deep matte black (#111111), slim fit, structured polo collar, hidden two-button placket with black tonal buttons, straight hem, very small tonal embroidered logo on chest, extremely fine premium knit with soft matte finish, perfectly steamed with minimal natural folds. Identical polos in white and dark navy hang neatly behind on a polished gold stainless steel clothing rack. The boutique features large polished white marble tiles with gray veining, warm concealed amber LED strips integrated behind displays, luxury monogram backpacks and black leather backpacks on upper shelves, and luxury designer caps with minimal embroidery. Mixed luxury showroom lighting at 3900K, warm concealed LED strips, soft ceiling spotlights and diffuse showroom fill. iPhone 15 Pro Max rear camera, 24mm equivalent, vertical orientation, chest level, centered composition, object priority autofocus on the front polo, light natural smartphone depth of field, Apple Smart HDR, Deep Fusion, natural sharpening, minimal noise reduction, maximum fabric texture and material realism. Quiet luxury, old money, minimal luxury, premium retail, Instagram luxury reel. No plastic fabric, no cheap clothing, no wrinkles, no poor stitching, no oversaturated colors, no noise, no motion blur, no bad anatomy, no extra fingers, no dirty gloves, no text, no watermark, no logo overlay.',
    negativePrompt:
      'plastic fabric, cheap clothing, wrinkles, poor stitching, oversaturated colors, noise, motion blur, bad anatomy, extra fingers, dirty gloves, text, watermark, logo overlay, blurry',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Menswear Polo', 'Quiet Luxury', 'Boutique POV', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 10: VÍDEO - LUXURY MENSWEAR POLO UGC
  // ==========================================
  {
    id: 'ugc-luxury-menswear-polo-video',
    postNumber: '10',
    title: 'TikTok Shop Luxury Menswear Polo Showcase',
    category: 'tiktok-shop',
    additionalCategories: ['videos'],
    categoryLabel: 'Tiktok Shop',
    mediaType: 'video',
    mediaUrl: '/imagensprompt/vid10prompt.mp4',
    posterUrl: '/imagensprompt/img09prompt.webp',
    prompt:
      'POV (first-person perspective). Follow the reference image exactly. Do not rotate, tilt, or flip the garment. The hanger remains centered while both hands make slow, confident adjustments. The garment gently sways from natural hand movement with realistic cloth simulation. Subtle breathing motion and premium handheld camera micro-shakes throughout. No dialogue.',
    negativePrompt:
      'blurry, distorted, camera jitter, abrupt cuts, low framerate, rotation, flip, low resolution, watermark, text overlay',
    recommendedModel: 'Kling AI 1.5 / Runway Gen-3 / Hailuo Minimax',
    aspectRatio: '9:16',
    tags: ['TikTok Shop', 'Menswear Video', 'POV Motion', 'Cloth Simulation', 'Handheld Motion'],
    motionType: 'POV Hanger & Garment Adjustment',
  },

  // ==========================================
  // POST 11: IMAGEM - ACADEMIA MIRROR SELFIE
  // ==========================================
  {
    id: 'academia-mirror-selfie-11',
    postNumber: '11',
    title: 'Academia Gym Mirror Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img11prompt.webp',
    posterUrl: '/imagensprompt/img11prompt.webp',
    prompt:
      'A young woman with long wavy blonde hair and a light complexion with subtle freckles, captured in a full-body mirror selfie at a gym. She is wearing a matching dusty rose-colored athletic set, consisting of a sports bra and high-waisted form-fitting short shorts. The woman is standing barefoot, posing with her back partially turned toward the mirror while looking directly at her reflection. She holds a black smartphone in her right hand to take the photo, while her left arm hangs naturally by her side. The background shows a minimalist gym setting with solid black walls and a metal rack filled with black dumbbells, all reflected clearly in the large mirror. The lighting is provided by bright overhead gym ceiling panels, casting soft, clear illumination. The concrete floor is visible in the reflection. Photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Mirror Selfie', 'Gym Set', 'Photorealistic', 'Fitness UGC'],
  },

  // ==========================================
  // POST 12: IMAGEM - ACADEMIA BOXING GYM
  // ==========================================
  {
    id: 'academia-boxing-gym-12',
    postNumber: '12',
    title: 'Academia Boxing Gym Mat',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img12prompt.webp',
    posterUrl: '/imagensprompt/img12prompt.webp',
    prompt:
      'A young woman with shoulder-length wavy blonde hair and visible freckles sitting on a dark interlocking foam gym floor mat, cross-legged, wearing a white ribbed sports bra and black leggings, skin glistening with sweat. In front of her sits a clear plastic bottle of Volvic water and a pair of light pink boxing gloves. In the background, a boxing gym interior is visible with a blue boxing ring, hanging black punching bags, red brick walls, and gym posters. The scene is lit by overhead gym lights and soft natural light from a window on the right. Medium shot, eye-level perspective, focused on the woman, photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Boxing Gym', 'Fitness UGC', 'Photorealistic', 'Cross-legged'],
  },

  // ==========================================
  // POST 13: IMAGEM - ACADEMIA FLOOR MIRROR SELFIE
  // ==========================================
  {
    id: 'academia-floor-mirror-selfie-13',
    postNumber: '13',
    title: 'Academia Floor Wet Hair Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img13prompt.webp',
    posterUrl: '/imagensprompt/img13prompt.webp',
    prompt:
      'A medium shot selfie of a young woman with long blonde wavy hair styled with a wet look, having visible light freckles on her face. She is sitting on the floor of a dark-themed gym with black rubber flooring and black walls. She is wearing a fitted light beige short-sleeve crop t-shirt and grey leggings, paired with white Nike crew socks that have a visible black swoosh logo. She is holding a smartphone in her left hand to take the mirror selfie, looking directly at the camera with a neutral expression. Her skin has a slight sheen from perspiration. To her right, there is a rack of black dumbbells and a metal support beam. The lighting is bright and linear from an overhead fixture, casting clean highlights on the subject and the gym equipment. The image is a clear, sharp, high-detail mirror selfie, photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Mirror Selfie', 'Nike Socks', 'Wet Look', 'Dumbbells'],
  },

  // ==========================================
  // POST 14: IMAGEM - ACADEMIA RIBBED BRA POWER RACK
  // ==========================================
  {
    id: 'academia-ribbed-bra-14',
    postNumber: '14',
    title: 'Academia Power Rack Casual Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img14prompt.webp',
    posterUrl: '/imagensprompt/img14prompt.webp',
    prompt:
      'A medium shot selfie of a young Caucasian woman with blonde hair and freckles, wearing a grey ribbed sports bra and charcoal grey leggings. Her skin is visibly sweaty, and she has a neutral expression with slightly puckered lips. She is holding a black smartphone in her right hand to take the photo in a mirror inside a gym. The background shows parts of a power rack, gym benches, and rubber flooring. Bright natural sunlight enters from the side, casting soft shadows on the wall behind her. The composition is centered, capturing her from the upper thighs up. The image has the look of a casual, unposed gym mirror selfie, photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Mirror Selfie', 'Ribbed Sports Bra', 'Power Rack', 'Casual Fitness'],
  },

  // ==========================================
  // POST 15: IMAGEM - ACADEMIA SMITH MACHINE
  // ==========================================
  {
    id: 'academia-smith-machine-15',
    postNumber: '15',
    title: 'Academia Smith Machine Glasses Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img15prompt.webp',
    posterUrl: '/imagensprompt/img15prompt.webp',
    prompt:
      'A young woman with brown hair pulled back into a ponytail, wearing black-rimmed glasses, a dark grey long-sleeved tight-fitting crop top, and matching dark grey loose athletic shorts. She is standing inside a Smith machine at a gym, holding a modern smartphone with a triple-camera setup to take a mirror selfie. Her right arm is extended upward, gripping the metal bar of the rack, while her left hand holds the phone. She has a neutral, focused facial expression. The background features gym mirrors showing reflections of the exercise equipment and other people in the gym. The lighting is bright and uniform, characteristic of indoor gym facilities. The overall image has a clean, high-resolution aesthetic with sharp focus on the subject and the details of her clothing and gym equipment. Photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Smith Machine', 'Glasses', 'Ponytail', 'Triple Camera'],
  },

  // ==========================================
  // POST 16: IMAGEM - ACADEMIA BASEBALL CAP AESTHETIC
  // ==========================================
  {
    id: 'academia-baseball-cap-16',
    postNumber: '16',
    title: 'Academia Baseball Cap Toned Aesthetic',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img16prompt.webp',
    posterUrl: '/imagensprompt/img16prompt.webp',
    prompt:
      'A medium shot selfie of a fit woman with a toned physique standing in a gym in front of a mirror. She is wearing a black sleeveless crop top, a black baseball cap with a white logo, and light grey sweatpants pulled down slightly at the waist to reveal black thong underwear. She is holding a black smartphone with her right hand to take the picture, looking directly into the mirror with a neutral expression. Her hair is tied back. The background is a dark gym interior with black rubber flooring and blurred exercise equipment. The lighting is provided by bright overhead spotlights creating high-contrast illumination and reflections on the mirror. Photorealistic, sharp focus, high detail, gym aesthetic, authentic lighting.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Baseball Cap', 'Toned Physique', 'Spotlight Lighting', 'Gym Aesthetic'],
  },

  // ==========================================
  // POST 17: IMAGEM - ACADEMIA DAMP HAIR KETTLEBELLS
  // ==========================================
  {
    id: 'academia-damp-hair-17',
    postNumber: '17',
    title: 'Academia Dumbbells & Kettlebells Floor Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img17prompt.webp',
    posterUrl: '/imagensprompt/img17prompt.webp',
    prompt:
      'A young woman with long, wavy, dark damp hair is sitting on the floor of a gym taking a mirror selfie. She is wearing a simple white short-sleeve t-shirt, light grey leggings, and white mid-calf socks with a black Nike swoosh logo on each. She is sitting with her legs bent in front of her. The background consists of a black rubberized gym floor and a weight rack filled with various black iron dumbbells and kettlebells, all reflected in a large mirror behind her. The lighting is artificial and functional, consistent with a gym environment. The shot is captured as a mirror selfie from a smartphone. The woman has a neutral facial expression. Photorealistic, sharp focus, high detail.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Nike Socks', 'Kettlebells', 'Dumbbells Rack', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 18: IMAGEM - ACADEMIA BRAZILIAN FITNESS INFLUENCER (JSON PROMPT)
  // ==========================================
  {
    id: 'academia-brazilian-influencer-18',
    postNumber: '18',
    title: 'Academia Brazilian Influencer Bathroom Mirror',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img18prompt.webp',
    posterUrl: '/imagensprompt/img18prompt.webp',
    prompt:
      '{"metadata":{"id":"gym_female_003","category":"GYM Academia","tags":["fitness","mirror selfie","gym","lifestyle","athletic"],"gender":"female","ethnicity":"brazilian","age_range":"20-25","format":"9:16"},"prompt_structure":{"quality_modifiers":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed","subject":{"main_description":"fit Brazilian female fitness influencer taking mirror selfie","age":"23 years old","facial_features":"symmetrical face, full lips, defined brows, natural beauty","expression":"confident soft smile, relaxed and self-assured","skin":"smooth natural skin texture, healthy glow, realistic pores","makeup":"natural glam makeup, soft blush, nude lips, defined lashes"},"hair":{"style":"long straight hair","color":"jet black","texture":"smooth, silky, natural shine"},"clothing":{"description":"white fitted crop top and high-waisted blue athletic shorts","style":"gym activewear, form-fitting","accessories":"smartwatch on wrist, smartphone with pink case"},"hands_nails":{"description":"((well-manicured hands with five fingers, natural hand anatomy)):1.3","nails":"long acrylic nails, glossy nude finish","pose":"one hand holding smartphone for mirror selfie, other resting naturally on hip"},"product":{"type":"smartphone","description":"((modern smartphone with visible camera lenses)):1.2, pink case","positioning":"held in right hand at chest level, angled toward mirror"},"pose_composition":{"body_position":"standing sideways with slight hip tilt, accentuating athletic physique","eye_direction":"looking at phone screen reflection","overall_pose":"mirror selfie pose, confident and natural gym stance"},"camera_settings":{"shot_type":"medium full body","aperture":"f/2.8","depth_of_field":"moderate depth, subject sharp with slightly soft background","format":"vertical 9:16"},"lighting":{"primary":"bright bathroom lighting","quality":"soft even illumination, no harsh shadows","direction":"overhead and frontal reflection","temperature":"5500K neutral white"},"background":{"setting":"modern bathroom mirror environment","description":"clean bathroom with shower glass, neutral walls, minimal clutter","atmosphere":"clean, casual, lifestyle setting"},"color_grading":{"palette":"neutral tones with soft contrast","mood":"clean, confident, lifestyle","saturation":"natural balanced colors"},"style_aesthetic":{"photography_style":"authentic mirror selfie, influencer lifestyle content","mood":"confident, casual, relatable","authenticity":"real moment, not overly staged"}},"final_prompt":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, fit Brazilian female fitness influencer taking mirror selfie, 23 years old, symmetrical face, full lips, defined brows, natural beauty, confident soft smile, relaxed expression, smooth natural skin texture with healthy glow, natural glam makeup with nude lips and defined lashes, long straight jet black hair, silky smooth texture, white fitted crop top, high-waisted blue athletic shorts, form-fitting gym activewear, smartwatch on wrist, holding ((modern smartphone with visible camera lenses)):1.2 with pink case, ((well-manicured hands with five fingers, natural hand anatomy)):1.3, long acrylic glossy nude nails, one hand holding phone, other resting on hip, standing sideways with slight hip tilt, athletic physique emphasized, looking at phone reflection, mirror selfie pose, medium full body shot, vertical 9:16, f/2.8 aperture, moderate depth of field, subject sharp, bright bathroom lighting, soft even illumination, 5500K neutral white, modern bathroom mirror setting, clean shower glass and neutral walls, minimal clutter, clean lifestyle atmosphere, neutral color palette, soft contrast, authentic mirror selfie style, confident casual relatable mood","negative_prompt_compiled":"deformed hands, extra fingers, missing fingers, bad anatomy, blurry phone, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, messy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces","api_parameters":{"width":512,"height":912,"steps":45,"cfg_scale":7.5,"sampler":"DPM++ 2M Karras","seed":-1}}',
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, blurry phone, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, messy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces',
    recommendedModel: 'SDXL / ComfyUI / Flux.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Brazilian Fitness', 'Activewear', 'Full Prompt JSON', '8k UHD'],
  },

  // ==========================================
  // POST 19: IMAGEM - ACADEMIA CARDIO ELLIPTICAL (JSON PROMPT)
  // ==========================================
  {
    id: 'academia-cardio-elliptical-19',
    postNumber: '19',
    title: 'Academia Cardio Elliptical Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img19prompt.webp',
    posterUrl: '/imagensprompt/img19prompt.webp',
    prompt:
      '{"metadata":{"id":"gym_female_002","category":"GYM Academia","tags":["fitness","gym","cardio","selfie","lifestyle"],"gender":"female","ethnicity":"brazilian","age_range":"25-30","format":"9:16"},"prompt_structure":{"quality_modifiers":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed","subject":{"main_description":"athletic Brazilian female fitness influencer taking a gym selfie","age":"27 years old","facial_features":"symmetrical face, defined cheekbones, natural beauty","expression":"focused and calm, slight confident smile","skin":"natural texture, healthy glow, subtle workout sweat","makeup":"minimal gym makeup, natural look, light mascara"},"hair":{"style":"long loose hair","color":"dark brown with subtle highlights","texture":"natural flow, slightly tousled from workout"},"clothing":{"description":"light beige sports bra and high-waisted gray leggings","style":"fitness activewear, form-fitting, modern athletic look","accessories":"((rose gold wireless headphones):1.2), delicate bracelet on wrist"},"hands_nails":{"description":"((well-manicured hands, five fingers, natural hand anatomy)):1.3","nails":"short nude polished nails","pose":"one hand holding camera/phone in selfie angle, other hand resting on cardio machine handle"},"product":{"type":"cardio machine (elliptical trainer)","description":"modern black elliptical machine with digital display, realistic gym equipment","positioning":"foreground, user interacting naturally with handles"},"pose_composition":{"body_position":"seated/engaged on elliptical machine, slight torso twist for selfie angle","eye_direction":"looking slightly downward toward phone","overall_pose":"natural candid gym selfie, relaxed and authentic posture"},"camera_settings":{"shot_type":"overhead selfie medium shot","aperture":"f/2.8","depth_of_field":"shallow depth with soft background blur","format":"vertical 9:16"},"lighting":{"primary":"natural window light mixed with gym ambient lighting","quality":"soft diffused","direction":"top-front angle","temperature":"5500K natural daylight"},"background":{"setting":"modern spacious gym interior","description":"blurred gym equipment, weights and large windows with daylight","atmosphere":"clean, minimal, premium fitness environment"},"color_grading":{"palette":"neutral tones with warm highlights","mood":"calm, focused, lifestyle fitness","saturation":"natural balanced tones"},"style_aesthetic":{"photography_style":"authentic UGC fitness content","mood":"relatable, real workout moment","authenticity":"candid selfie, not staged, natural gym vibe"}},"final_prompt":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, athletic Brazilian female fitness influencer, 27 years old, symmetrical face, defined cheekbones, focused calm expression with slight confident smile, natural skin texture with healthy glow and subtle sweat, minimal gym makeup, long dark brown hair slightly tousled, light beige sports bra and high-waisted gray leggings, modern fitness activewear, ((rose gold wireless headphones):1.2), delicate bracelet, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, one hand holding phone in selfie angle, other hand resting on elliptical handle, modern black elliptical machine in foreground, natural candid gym selfie pose, slight torso twist, looking downward toward phone, overhead selfie medium shot, vertical 9:16 format, f/2.8 aperture, shallow depth of field with soft background blur, natural window light mixed with gym lighting, soft diffused light, 5500K daylight, modern gym interior with blurred equipment and large windows, clean minimal environment, neutral color palette with warm tones, authentic UGC fitness style, relatable real workout moment","negative_prompt_compiled":"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable display, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces","api_parameters":{"width":512,"height":912,"steps":45,"cfg_scale":7.5,"sampler":"DPM++ 2M Karras","seed":-1}}',
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable display, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces',
    recommendedModel: 'SDXL / ComfyUI / Flux.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Elliptical', 'Cardio', 'Rose Gold Headphones', 'Full Prompt JSON'],
  },

  // ==========================================
  // POST 20: IMAGEM - ACADEMIA BENCH HIGH-ANGLE (JSON PROMPT)
  // ==========================================
  {
    id: 'academia-bench-highangle-20',
    postNumber: '20',
    title: 'Academia Workout Bench High-Angle Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img20prompt.webp',
    posterUrl: '/imagensprompt/img20prompt.webp',
    prompt:
      '{"metadata":{"id":"gym_female_003","category":"GYM Academia","tags":["fitness","gym","selfie","workout","lifestyle"],"gender":"female","ethnicity":"brazilian","age_range":"25-30","format":"9:16"},"prompt_structure":{"quality_modifiers":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed","subject":{"main_description":"beautiful athletic Brazilian female fitness influencer taking a gym selfie","age":"26 years old","facial_features":"symmetrical face, defined cheekbones, soft jawline, natural beauty","expression":"playful pout lips, confident and relaxed expression","skin":"natural skin texture, smooth healthy glow, slight workout warmth","makeup":"minimal natural makeup, soft matte finish, light mascara, nude lips"},"hair":{"style":"low ponytail","color":"dark brown","texture":"sleek and smooth, neatly tied back"},"clothing":{"description":"black fitted long sleeve athletic top with blue high-waisted leggings","style":"modern fitness activewear, sleek and form-fitting","accessories":"((light pink over-ear wireless headphones)):1.2, small delicate necklace"},"hands_nails":{"description":"((well-manicured hands, five fingers, natural hand anatomy)):1.3","nails":"short nude nails, clean and natural","pose":"one hand extended holding phone in selfie angle, other hand resting on thigh"},"product":{"type":"gym equipment bench","description":"modern black workout bench with metallic frame, realistic gym equipment","positioning":"subject seated on bench, equipment partially visible in foreground"},"pose_composition":{"body_position":"seated on gym bench with one leg slightly extended","eye_direction":"looking directly at phone camera","overall_pose":"overhead selfie angle, casual and confident gym pose"},"camera_settings":{"shot_type":"high-angle selfie medium shot","aperture":"f/2.8","depth_of_field":"shallow depth of field with soft background blur","format":"vertical 9:16"},"lighting":{"primary":"natural window light mixed with gym ambient lighting","quality":"soft diffused","direction":"top-down angle","temperature":"5500K natural daylight"},"background":{"setting":"modern gym interior","description":"blurred gym machines, wooden flooring, workout equipment in background","atmosphere":"clean, organized, premium fitness environment"},"color_grading":{"palette":"neutral tones with subtle warm highlights","mood":"calm, confident, lifestyle fitness","saturation":"natural balanced tones"},"style_aesthetic":{"photography_style":"authentic UGC fitness content","mood":"relatable and casual gym moment","authenticity":"natural selfie, not overly staged, real workout vibe"}},"final_prompt":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, beautiful athletic Brazilian female fitness influencer, 26 years old, symmetrical face, defined cheekbones, playful pout lips, confident relaxed expression, natural skin texture with healthy glow and slight workout warmth, minimal natural makeup, sleek low ponytail dark brown hair, black fitted long sleeve athletic top with blue high-waisted leggings, modern form-fitting activewear, ((light pink over-ear wireless headphones):1.2), small delicate necklace, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, one hand extended holding phone in selfie angle, other hand resting on thigh, seated on modern gym bench, overhead selfie angle, casual confident pose, looking directly at phone camera, high-angle selfie medium shot, vertical 9:16 format, f/2.8 aperture, shallow depth of field, soft background blur, natural window light mixed with gym lighting, soft diffused light, 5500K daylight, modern gym interior with blurred equipment and wooden flooring, clean organized fitness environment, neutral tones with warm highlights, authentic UGC fitness style, relatable casual gym moment","negative_prompt_compiled":"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable details, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces","api_parameters":{"width":512,"height":912,"steps":45,"cfg_scale":7.5,"sampler":"DPM++ 2M Karras","seed":-1}}',
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable details, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces',
    recommendedModel: 'SDXL / ComfyUI / Flux.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Gym Bench', 'Overhead Angle', 'Pink Headphones', 'Full Prompt JSON'],
  },

  // ==========================================
  // POST 21: IMAGEM - ACADEMIA MALE SHOULDER PRESS
  // ==========================================
  {
    id: 'academia-male-shoulder-press-21',
    postNumber: '21',
    title: 'Academia Muscular Male Shoulder Press',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img21prompt.webp',
    posterUrl: '/imagensprompt/img21prompt.webp',
    prompt:
      '{"metadata":{"id":"gym_male_001","category":"GYM Academia","tags":["fitness","gym","strength","workout","male"],"gender":"male","ethnicity":"european","age_range":"25-30","format":"9:16"},"prompt_structure":{"quality_modifiers":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed","subject":{"main_description":"muscular male fitness influencer performing shoulder press with dumbbells","age":"27 years old","facial_features":"strong jawline, defined cheekbones, masculine features, symmetrical face","expression":"focused intense expression, determination, effort during lift","skin":"natural skin texture, slight sweat, visible muscle definition","makeup":"none, natural masculine appearance"},"hair":{"style":"short curly hair","color":"dark brown","texture":"slightly messy natural curls"},"clothing":{"description":"black fitted athletic t-shirt","style":"gym performance wear, tight fit showing muscular physique","accessories":"((wireless earbuds)):1.2, wrist wraps for lifting"},"hands_nails":{"description":"((strong hands gripping dumbbells, five fingers, natural hand anatomy)):1.3","nails":"short clean nails","pose":"hands firmly gripping dumbbells overhead in shoulder press position"},"product":{"type":"((pair of heavy dumbbells)):1.3","description":"black rubber-coated dumbbells with metal handles, realistic gym equipment","positioning":"held overhead above shoulders, symmetrical alignment"},"pose_composition":{"body_position":"seated upright on bench, arms extended overhead in shoulder press","eye_direction":"looking slightly upward with focus","overall_pose":"mid-rep action shot, strong stable posture, engaged core"},"camera_settings":{"shot_type":"medium close-up from waist to head","aperture":"f/2.8","depth_of_field":"shallow depth of field with blurred gym background","format":"vertical 9:16"},"lighting":{"primary":"natural window light mixed with gym lighting","quality":"soft diffused with slight contrast for muscle definition","direction":"45-degree top lighting","temperature":"5500K natural daylight"},"background":{"setting":"modern gym interior","description":"blurred gym equipment, machines and weights in background","atmosphere":"intense workout environment, focused training mood"},"color_grading":{"palette":"neutral tones with warm highlights","mood":"powerful, intense, motivational","saturation":"natural slightly enhanced contrast"},"style_aesthetic":{"photography_style":"professional fitness action photography","mood":"motivational, strong, disciplined","authenticity":"real workout moment, not staged"}},"final_prompt":"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, muscular male fitness influencer, 27 years old, strong jawline, defined cheekbones, focused intense expression, natural skin texture with slight sweat and visible muscle definition, short dark brown curly hair, black fitted athletic t-shirt, gym performance wear, ((wireless earbuds)):1.2, wrist wraps, ((strong hands gripping dumbbells, five fingers, natural hand anatomy)):1.3, ((pair of heavy dumbbells)):1.3, black rubber-coated weights, hands holding dumbbells overhead, seated upright on bench performing shoulder press, arms extended overhead, mid-rep action shot, looking slightly upward with focus, medium close-up from waist to head, vertical 9:16 format, f/2.8 aperture, shallow depth of field, blurred gym background, natural window light mixed with gym lighting, soft diffused lighting with slight contrast, 45-degree top lighting, 5500K daylight, modern gym interior with blurred equipment, intense workout atmosphere, neutral tones with warm highlights, powerful motivational mood, professional fitness action photography, authentic real workout moment","negative_prompt_compiled":"deformed hands, extra fingers, missing fingers, bad anatomy, weak grip, unrealistic weights, blurry dumbbells, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces","api_parameters":{"width":512,"height":912,"steps":45,"cfg_scale":7.5,"sampler":"DPM++ 2M Karras","seed":-1}}',
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, weak grip, unrealistic weights, blurry dumbbells, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces',
    recommendedModel: 'SDXL / ComfyUI / Flux.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Male Fitness', 'Shoulder Press', 'Dumbbells', 'Full Prompt JSON'],
  },

  // ==========================================
  // POST 22: IMAGEM - ACADEMIA KITCHEN ATHLEISURE
  // ==========================================
  {
    id: 'academia-kitchen-athleisure-22',
    postNumber: '22',
    title: 'Academia Fit Blonde Kitchen Athleisure',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img22prompt.webp',
    posterUrl: '/imagensprompt/img22prompt.webp',
    prompt:
      '{"type":"image_prompt","style":"photorealistic lifestyle fashion photography","subject":{"description":"fit blonde woman posing confidently indoors","pose":"front pose with hands on hips","expression":"confident, friendly, relaxed","appearance":{"hair":"long blonde hair loose with soft waves","outfit":{"top":"white cropped short-sleeved top with cutout at the chest","bottom":"mint green high-waisted tight shorts"}}},"environment":{"location":"modern minimalist kitchen","features":["light stone countertop","neutral cabinets","contemporary and clean layout"]},"lighting":{"type":"soft interior lighting","source":"ceiling lights","mood":"clean, cozy, flattering"},"camera":{"angle":"eye level","framing":"mid-body to upper leg framing","lens":"35mm","depth_of_field":"subject sharp with mildly smoothed background"},"color_palette":{"dominant":["white","beige","neutral tones"],"accent":["mint green"]},"quality":{"resolution":"high","sharpness":"sharp","realism":"high"},"use_case":["fashion marketing","social media content","fitness lifestyle brand","UGC-style promotion"]}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Athleisure', 'Mint Green Shorts', 'Kitchen UGC', 'Lifestyle Fashion'],
  },

  // ==========================================
  // POST 23: IMAGEM - ACADEMIA LOCKER ROOM HOURGLASS
  // ==========================================
  {
    id: 'academia-locker-room-23',
    postNumber: '23',
    title: 'Academia Locker Room Hourglass Mirror Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img23prompt.webp',
    posterUrl: '/imagensprompt/img23prompt.webp',
    prompt:
      '{"subject":{"description":"A young woman with a highly defined athletic hourglass morphology, capturing a mirror selfie in a fitness environment.","body":{"physique":"Athletic hourglass silhouette with extreme gluteal hypertrophy and a pronounced waist-to-hip ratio.","details":"Narrow waistline transitioning into wide, muscular hips and voluminous gluteus maximus development. Strong, toned quadriceps and hamstrings. Slender upper torso with defined scapula and soft shoulder definition. Natural skin texture with visible pores and subtle muscle highlights.","face":"Side profile view, soft jawline, neutral expression, focused gaze toward the smartphone screen.","hair":"Long, thick hair with a mix of blonde highlights and brunette base, styled in a long, neat braid secured with a red scrunchie, two loose strands framing the face."},"wardrobe":{"top":"Minimalist beige sports bra with thin spaghetti straps, form-fitting ribbed fabric.","bottom":"High-waisted slate blue \'scrunch\' gym shorts featuring side-tie drawstring details and a small white brand emblem on the rear waistband (text reads \'LOGO\').","accessories":"Tan and gold over-ear premium headphones (text on earcups reads \'BEATS\'). A smartphone in a silver glitter-encrusted protective case."},"pose_action":"Mirror selfie pose; the subject is standing with her body angled in a three-quarter rear-view twist to emphasize the curvature of the lower body. One hand holds the phone steady at chest height while the other arm is out of frame. Weight is shifted to the front leg to accentuate the hip line."},"scene":{"location":"Modern gym locker room interior.","background":"Rows of white metal lockers to the left, a light wood grain bench in the foreground, and neutral-toned laminate flooring. A large full-length mirror with a thin silver frame reflects the room. Signage is visible on the wall and mirror (text reads \'Re-set\' and \'Notice\').","composition":"Vertical 9:16 aspect ratio, medium-full shot focusing on the subject\'s form and the reflective environment."},"lighting":{"type":"Diffused indoor overhead lighting typical of commercial fitness centers.","details":"Soft, even illumination creating gentle shadows that define muscle volume. Realistic specular highlights on the skin and the metallic surfaces of the lockers. No harsh direct glares."},"camera":{"technical":"Professional mobile photography aesthetic, high-resolution sensor, 24mm wide-angle lens equivalent to capture the full silhouette.","settings":"Deep depth of field ensuring both the subject and the background lockers remain in clear focus, sharp textures, zero motion blur, realistic color balance."},"constraints":{"negative_prompts":["no logos","no beautify smoothing","no extra limbs","no text","no watermark","distorted proportions","low resolution"],"rules":["reflection integrity rules: ensure the mirror reflection aligns perfectly with the subject\'s pose and environment","anatomical accuracy in muscle attachment points","realistic fabric tension and wrinkles"]}}',
    negativePrompt:
      'no logos, no beautify smoothing, no extra limbs, no text, no watermark, distorted proportions, low resolution',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Locker Room', 'Hourglass Morphology', 'Scrunch Shorts', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 24: IMAGEM - ACADEMIA OVER SHOULDER SMILE
  // ==========================================
  {
    id: 'academia-over-shoulder-24',
    postNumber: '24',
    title: 'Academia Over-the-Shoulder Nike Spandex',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img24prompt.webp',
    posterUrl: '/imagensprompt/img24prompt.webp',
    prompt:
      'A young woman, possibly in her 20s, is the main subject, captured in a medium close-up, from the back and slightly to the side, inside what appears to be a gym or fitness center. She has fair skin, a warm smile, and her head is tilted back over her right shoulder, her chest tilted forward, looking directly at the viewer with a slight smile. Her hair is tied back, possibly in a messy bun or ponytail, with a few strands hanging loose. She is wearing athletic attire: a dark gray sports bra with an abstract Nike design and navy blue spandex shorts. The shorts have a white Nike logo graphic on the left cheek. The shorts fit snugly, emphasizing her buttocks. Her physique is toned and athletic. The background suggests a gym environment. The walls are predominantly a bright mustard yellow or ochre, contrasted by black or dark gray vertical elements, likely structural columns or equipment racks. On the left, a mirrored surface reflects part of the gym\'s interior, including exercise equipment and another individual. In the background, on the left side, another woman is partially visible, with her back to the camera. This woman is wearing a dark top, possibly a bra top, and long red pants or leggings. Her back is exposed. Behind the main subject and to the right, there are glimpses of exercise equipment, including what appear to be yellow and possibly dark green weight plates, stacked on shelves. The lighting is bright and typical of an indoor sports facility. The overall image has a slight contrast, possibly retouched or stylized.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Over-the-Shoulder', 'Nike Spandex', 'Warm Smile', 'Toned Physique'],
  },

  // ==========================================
  // POST 25: IMAGEM - ACADEMIA UGC CLOSEUP IPHONE
  // ==========================================
  {
    id: 'academia-ugc-iphone-25',
    postNumber: '25',
    title: 'Academia UGC Close-up iPhone Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img25prompt.webp',
    posterUrl: '/imagensprompt/img25prompt.webp',
    prompt:
      '{"subject":{"description":"Mulher jovem fazendo uma selfie na academia, enquadramento próximo, estética UGC realista captada com iPhone","age":"21 anos","expression":"expressão neutra a levemente confiante, lábios relaxados, olhar direto para a câmera","hair":{"color":"loiro","style":"cabelo solto, liso a levemente ondulado, preso parcialmente para treino"},"eyes":{"color":"claros","details":"olhos bem iluminados pela luz ambiente da academia"},"clothing":{"top":{"type":"top esportivo","color":"preto ou tons neutros","details":"modelo fitness simples, sem logotipos visíveis"},"bottom":{"type":"legging esportiva","color":"preto ou cinza escuro","details":"ajuste justo, tecido fosco"}},"face":{"preserve_original":true,"makeup":"maquiagem leve de treino, pele natural, leve brilho de suor"}},"accessories":{"headwear":{"type":"","details":""},"jewelry":{"earrings":"pequenos brincos discretos","necklace":"","wrist":"relógio ou pulseira fitness","rings":""},"device":{"type":"smartphone","details":"selfie com câmera frontal do iPhone, segurado com uma mão"},"prop":{"type":"","details":""}},"photography":{"camera_style":"selfie com câmera frontal de smartphone, estética UGC autêntica","angle":"ângulo levemente inclinado, câmera próxima ao rosto","shot_type":"plano médio fechado, do busto para cima","aspect_ratio":"9:16 vertical","texture":"nitidez moderada, textura de pele natural, leve ruído típico de ambiente interno"},"background":{"setting":"academia","wall_color":"tons neutros ou escuros","elements":["espelhos","equipamentos de musculação desfocados","iluminação artificial de teto"],"atmosphere":"ambiente de treino ativo, cotidiano","lighting":"luz artificial branca, uniforme, sem efeito dramático"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'UGC Selfie', 'iPhone Front Camera', 'Pele Natural', 'Close-up'],
  },

  // ==========================================
  // POST 26: IMAGEM - ACADEMIA LOCKER ROOM SNAKESKIN
  // ==========================================
  {
    id: 'academia-snakeskin-leggings-26',
    postNumber: '26',
    title: 'Academia Locker Room Snakeskin Leggings',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img26prompt.webp',
    posterUrl: '/imagensprompt/img26prompt.webp',
    prompt:
      '{"subject":{"appearance":{"gender":"Female","age_range":"Young adult (approx. 20s)","hair":{"color":"Blonde with slightly darker roots","style":"Long, straight, layered, falling over shoulders","bangs":"Wispy curtain bangs framing the face"},"skin_tone":"Light/Fair","facial_features":{"eyes":"Light blue or green","expression":"Neutral, soft, slightly gazing away from the lens to the left","makeup":"Natural/minimal, subtle blush, groomed brows"},"physique":"Athletic, toned, fit, curvaceous silhouette"},"pose":{"type":"Mirror selfie","body_orientation":"Three-quarter turn to the left","posture":"Standing with weight shifted to one hip (popped hip), creating an S-curve","hands":{"right_hand":"Holding a smartphone up to capture the reflection","left_hand":"Resting gently near the midriff/waist"}},"clothing":{"top":{"type":"Sports bra","color":"Light heather grey/off-white","details":"Spaghetti straps, plunging neckline, ribbed texture"},"bottom":{"type":"High-waisted leggings","color":"Light grey/blue and white","pattern":"Snakeskin or animal print","fit":"Tight, compression fit"},"accessories":{"jewelry":["Thin silver or gold necklace","Multiple silver rings on fingers","Black and green thin wristbands/hair ties on left wrist","Small tattoo on left forearm"],"nails":"Dark red/burgundy polish, medium length"}}},"environment":{"setting":"Gym locker room or changing area","background_elements":{"left":"Metal coat rack stand with a black puffer jacket and a black/green gym bag hanging (text FITNESS visible inverted)","floor":"Dark bench, light beige tiled flooring","walls":"White textured plaster walls","right":"Corner of a wall, glimpse of a doorway or hallway"}},"lighting":{"type":"Soft indoor ambient lighting","direction":"Frontal/Overhead","quality":"Diffused, creating soft highlights on the skin and hair, minimal harsh shadows"},"tech_specs":{"camera_angle":"Eye-level (via mirror)","framing":"Medium shot (thighs up)","device_visible":"iPhone with a white case and MagSafe ring, grey lanyard strap hanging down","style":"Photorealistic, high-resolution social media aesthetic, candid lifestyle shot"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Locker Room', 'Snakeskin Leggings', 'MagSafe iPhone', 'Curtain Bangs'],
  },

  // ==========================================
  // POST 27: IMAGEM - ACADEMIA BRAZILIAN ATHLEISURE DAYLIGHT
  // ==========================================
  {
    id: 'academia-brazilian-daylight-27',
    postNumber: '27',
    title: 'Academia Brazilian Athleisure Natural Daylight',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img27prompt.webp',
    posterUrl: '/imagensprompt/img27prompt.webp',
    prompt:
      '{"visual_ontology_schema":{"metadata":{"aspect_ratio_standard":"9:16 (Full Vertical - Story/Reel/TikTok)","intended_platform_context":"Instagram Grid Post (Permanent)","content_lifecycle":"Generated/Synthetic"},"subject":{"description":"A 25-year-old Brazilian woman in black athletic wear posing for a selfie in a bright, modern gym environment.","special_rules":{"perspective_rules":"Eye-level framing, direct gaze, front-facing selfie perspective."},"demographics":{"age":"25","gender_presentation":"Feminine","ethnicity":"Brazilian / Latina"},"face":{"preserve_original":true,"expression":"gentle, relaxed smile with a soft, confident gaze","expression_archetype":"Resting Relaxed","eyes":{"color":"hazel-brown","details":"Almond-shaped eyes, looking directly into the camera lens with subtle catchlights."},"skin":{"tone":"tanned/brunette (morena) with warm glowing undertones","texture":"glowing, dewy, and smooth with a slight sheen on the forehead and cheekbones"},"makeup":{"style":"Clean Girl / No-Makeup Makeup","details":"Natural-looking lashes, groomed brows, subtle peach blush, and a nude-pink lip balm."},"facial_features":{"nose":"straight, delicate bridge","lips":"full, symmetrical, soft pink","jawline":"softly defined","cheekbones":"subtle, naturally high"}},"hair":{"color":"brown (castanho)","style":"middle part, hair falling naturally over the shoulders","texture":"Straight with a slight natural wave at the ends","finish":"Natural Air-Dried","length":"Long (below shoulders)"},"body":{"build":"curvy and naturally fit","posture":"Standing upright, slightly angled toward the camera","visible_body_parts":["face","neck","shoulders","torso","midriff"],"specific_details":"visible clavicles, toned shoulders, flat midriff, full bust"},"clothing":{"overall_style":"athleisure","top":{"type":"layered strappy sports bra","color":"black","details":"Double thin straps on each shoulder, scoop neckline, form-fitting crop cut."},"bottom":{"type":"high-waisted leggings","color":"black","details":"Fitted athletic fabric, high waistband sitting just above the navel."},"fit_and_silhouette":"form-fitting"},"pose_and_action":{"pose_type":"Direct Address","action_description":"Posing for a chest-up selfie in a gym setting.","hand_placement":"One arm extended to hold the camera/phone."},"accessories":{"device":{"type":"smartphone","details":"Handheld selfie perspective"}},"background":{"setting":"high-end, spacious modern gym","wall_color":"beige and light wood paneling","floor":"light-colored hardwood","elements":["treadmill with digital screen","cable weight machine","large floor-to-ceiling windows showing bright daylight"],"depth_and_focus":"Shallow DOF (blurred background)","atmosphere":"casual lifestyle, bright, clean, and motivating"},"lighting":{"primary_source":"Natural daylight (window)","quality":"soft natural daylight with diffused evenness","direction":"Front lit / Ambient","color_temperature":"Neutral (5000-5500K)","mood":"bright and airy"},"technical_acquisition":{"camera_mode":"Front-Facing/Selfie","camera_angle":"Eye level","framing":"Medium Shot (MS)"},"aesthetic_and_style":{"overall_archetype":"The Influencer","color_palette":{"dominant_colors":["black","beige","light wood","soft gray"],"color_harmony":"Neutral"}}}}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Brazilian Latina', 'Clean Girl', 'Natural Daylight', 'Athleisure'],
  },

  // ==========================================
  // POST 28: IMAGEM - ACADEMIA KITCHEN MIRROR GOLDEN HOUR
  // ==========================================
  {
    id: 'academia-kitchen-goldenhour-28',
    postNumber: '28',
    title: 'Academia Kitchen Mirror Golden Hour Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img28prompt.webp',
    posterUrl: '/imagensprompt/img28prompt.webp',
    prompt:
      '{"visual_ontology_schema":{"metadata":{"aspect_ratio_standard":"9:16 (Full Vertical - Story/Reel/TikTok)","intended_platform_context":"Instagram Story (Ephemeral)","content_lifecycle":"Live/Raw"},"subject":{"description":"A young woman taking a full-body mirror selfie in a kitchen setting, showcasing her fitness physique and outfit while posing with one arm raised.","special_rules":{"mirror_rules":"The subject is a reflection in a large floor mirror; the text Gym done is a digital overlay added in post-production and is not reversed.","perspective_rules":"Shot from a standing eye-level perspective relative to the mirror reflection."},"demographics":{"age":"young adult, 20s","gender_presentation":"Feminine","ethnicity":"White / Caucasian"},"face":{"preserve_original":true,"expression":"focused, slight pout, looking at phone screen in reflection","expression_archetype":"Blue Steel / Model Pout","eyes":{"color":"indistinguishable","details":"looking down at phone screen"},"skin":{"tone":"fair","texture":"smooth, golden hour illuminated"},"makeup":{"style":"Clean Girl / No-Makeup Makeup","details":"natural look, subtle lip color"}},"hair":{"color":"blonde","style":"long wavy hair falling down back","texture":"Wavy","finish":"Natural Air-Dried","length":"Long (below shoulders)"},"body":{"build":"athletic, fit, curvy","posture":"standing, back arched, hips twisted towards mirror (booty pose), one arm raised straight up","visible_body_parts":["full body","face","arms","back","legs","glutes"],"specific_details":"visible muscle tone in back and shoulders, accentuating glutes"},"clothing":{"overall_style":"athleisure / gym wear","top":{"type":"sports bra","color":"dark navy or charcoal grey","details":"strappy back, cropped fit"},"bottom":{"type":"leggings","color":"dark navy or charcoal grey","details":"seamless, high-waisted, form-fitting"},"footwear":"white sneakers with white crew socks","fit_and_silhouette":"form-fitting and tight"},"pose_and_action":{"pose_type":"Mirror Selfie","action_description":"taking a mirror selfie while raising left arm and looking back over right shoulder","hand_placement":"right hand holding phone, left arm extended vertically upwards"}},"accessories":{"jewelry":{"wrist":"gold bangle bracelet on right wrist","other":"small necklace visible"},"device":{"type":"smartphone","details":"iPhone with a light-colored case"}},"background":{"setting":"modern kitchen / dining area","location_context":"Domestic (Kitchen)","wall_color":"white (tiles and cabinets)","floor":"light wood laminate or tile","elements":["white kitchen cabinets","silver microwave oven","white subway tile backsplash","white countertop table","large tubs of protein powder (Whey)","small jar of supplements (BCAA)","red industrial style metal stool","large gold-rimmed arched floor mirror"],"depth_and_focus":"Sharp throughout (deep focus)","atmosphere":"casual lifestyle, fitness-oriented, golden hour warmth"},"lighting":{"primary_source":"Natural daylight (window)","quality":"harsh directional sunlight creating strong shadows","direction":"Side lit (from left)","color_temperature":"Warm (golden, 3000-4500K)","mood":"warm, energetic, sunny"},"technical_acquisition":{"device_class":"Smartphone (Flagship)","camera_mode":"Standard Wide","camera_angle":"Eye level","framing":"Long Shot (LS)"},"aesthetic_and_style":{"overall_archetype":"Gym/Fitness (Physique focused, high contrast)","color_palette":{"dominant_colors":["warm orange/gold (light)","dark navy (clothing)","white (background)","red (stool accent)"],"color_harmony":"Complementary (Warm light vs Cool clothing)","saturation_level":"Natural"}}}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Golden Hour', 'Kitchen Mirror', 'Arched Mirror', 'Supplements'],
  },

  // ==========================================
  // POST 29: IMAGEM - ACADEMIA GOBLET SQUAT IPHONE
  // ==========================================
  {
    id: 'academia-goblet-squat-29',
    postNumber: '29',
    title: 'Academia Deep Goblet Squat iPhone Shot',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img29prompt.webp',
    posterUrl: '/imagensprompt/img29prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Mulher jovem brasileira, loira, traços bem definidos, maxilar marcado, nariz de base média, lábios cheios naturais sem maquiagem aparente, olhos focados. A pele do rosto possui textura irregular altamente realista, com poros abertos bem visíveis na região do nariz e bochechas, pequenas manchas naturais de sol (melasma leve) e micro marcas, fugindo totalmente do aspecto de pele perfeita de IA, assimetria natural mantida."],"regras_de_aparencia":{"cabelo_pele":"Cabelo loiro longo preso para trás, levemente úmido nas raízes. Pele com brilho natural de suor, oleosidade visível na zona T do rosto, textura muscular bem definida nos braços e pernas, pele corporal com leves desníveis e textura humana crua e realista."}},"cena":{"local":"Academia de musculação com estética industrial e piso emborrachado escuro.","ambiente":["Espelho grande refletindo luzes tubulares horizontais de LED brilhantes.","Prateleira ao fundo preenchida com halteres e kettlebells.","Ambiente organizado, estética dark gym, focado em treino de força."],"atmosfera":"Focada, intensa, disciplinada e atlética."},"iluminacao":{"tipo":"Luz artificial de academia mista.","luz_principal":"Luz direcional de cima para baixo (overhead), criando sombras dramáticas que destacam intensamente a definição muscular e revelam a microtextura, poros e imperfeições do rosto.","luz_de_preenchimento":"Luzes de LED refletidas no espelho ao fundo ajudam a recortar a silhueta no ambiente escuro.","contraste":"Alto contraste, com sombras profundas e reflexos brilhantes na pele úmida."},"perspectiva_da_camera":{"pov":"Visão de terceira pessoa, câmera posicionada por outra pessoa ou em um tripé baixo.","angulo":"Ângulo baixo (low angle), aproximadamente na altura do peito/olhos da pessoa agachada.","distancia":"Corpo inteiro (full body), com o agachamento centralizado no enquadramento."},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"Fitness, autêntica, força, dedicação ao treino com estética real e sem filtros.","textura_pele":"Pele do rosto com poros dilatados aparentes, pequenas manchas de pigmentação irregular, oleosidade e suor misturados. Corpo com pele hidratada, brilho de suor natural, veias levemente aparentes nos braços devido ao esforço, textura muscular altamente definida e crua.","expressao":{"olhos":"Olhando fixamente para frente e ligeiramente para baixo, olhar penetrante e focado.","boca":"Lábios fechados, levemente ressecados pela respiração, maxilar travado em esforço.","emocao":"Concentração extrema, foco, determinação."},"pose":{"posicao":"Agachamento profundo (deep goblet squat), joelhos flexionados, postura ereta.","apoio":"Ambos os pés plantados firmemente no chão emborrachado escuro.","mao":"Ambas as mãos segurando firmemente a parte superior de um halter hexagonal pesado na altura do peito."},"roupa":{"blusa":{"tipo":"Top esportivo (sports bra) de alças finas.","caimento":"Justo e compressivo.","detalhes":"Tecido sintético liso de academia, cor rosa, mostrando pequenas dobras realistas de movimento."},"extra":["Shorts de ginástica rosa combinando com o top.","Meias esportivas brancas de cano médio franzidas (scrunch).","Tênis esportivos brancos estilo chunky com cadarços amarrados."]}}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Goblet Squat', 'Halter Hexagonal', 'Pele Real', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 30: IMAGEM - ACADEMIA ONE SHOULDER TOP IPHONE
  // ==========================================
  {
    id: 'academia-oneshoulder-top-30',
    postNumber: '30',
    title: 'Academia One-Shoulder Top Mirror Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img30prompt.webp',
    posterUrl: '/imagensprompt/img30prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["rosto oval de mulher brasileira de 20 anos, pele clara a média com textura humana altamente realista, poros aparentes e dilatados na zona T, pequenas manchas solares naturais, micro marcas de expressão e leves irregularidades na pele, sobrancelhas bem desenhadas, nariz reto e proporcional, lábios cheios com leve brilho natural (gloss), olhos escuros, maçãs do rosto marcadas, maxilar definido, sorrindo levemente, assimetria natural mantida"],"regras_de_aparencia":{"descricao_geral":"cabelo castanho escuro longo amarrado para trás em meio rabo de cavalo, tom de pele médio/bronzeado típico brasileiro, textura de pele realista com imperfeições naturais, poros visíveis, pequenas manchas e desníveis reais de pele humana, brilho natural de suor","marcas_especificas":"tatuagem grande estilo floral/mandala no braço direito"}},"cena":{"local":"academia de ginástica","ambiente":["aparelhos de musculação metálicos tipo rack e barras","anilhas de peso empilhadas à esquerda","ambiente organizado com piso emborrachado preto, pessoa levemente desfocada ao fundo à direita"],"atmosfera":"foco em treino, fitness, casual e diária"},"iluminacao":{"tipo":"iluminação artificial de teto fluorescente/LED","luz_principal":"luz vinda de cima, destacando os ombros, rosto e centro do corpo","contraste":"médio-alto"},"perspectiva_da_camera":{"pov":"selfie no espelho","angulo":"frontal, altura do peito/rosto","distancia":"plano médio, cortando no meio das coxas","visibilidade_do_celular":"celular iPhone escuro visível no reflexo, segurado pela mão esquerda na altura do peito"},"assunto":{"genero":"feminino","idade":"20 anos","vibe":"fitness, garota brasileira de academia confiante","textura_pele":"poros dilatados e bem visíveis de perto, textura levemente irregular e crua, micro marcas naturais no rosto, pequenas manchas de sol e sardas sutis, brilho de oleosidade/suor natural de academia","expressao":{"olhos":"olhando fixamente para a tela do celular através do reflexo no espelho","boca":"sorriso leve e fechado, lábios relaxados","emocao":"confiante, tranquila, satisfeita"},"pose":{"posicao":"em pé, postura ereta, leve curva no quadril","mao":"mão esquerda segurando o celular, braço direito relaxado estendido ao longo do corpo"},"roupa":{"blusa":{"tipo":"top cropped esportivo de um ombro só","caimento":"justo ao corpo, modelagem firme e compressiva","detalhes":"tecido grosso e texturizado tipo canelado/waffle, cor cinza chumbo escuro"},"extra":["shorts de academia cintura alta bem justo, mesma cor cinza chumbo e textura do top","smartwatch com pulseira clara no pulso esquerdo","brincos pequenos"]}}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'One-Shoulder', 'Tatuagem Floral', 'iPhone 15 Pro Max', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 31: IMAGEM - ACADEMIA BARBELL BENT-OVER ROW
  // ==========================================
  {
    id: 'academia-barbell-row-31',
    postNumber: '31',
    title: 'Academia Barbell Bent-Over Row Athlete',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img31prompt.webp',
    posterUrl: '/imagensprompt/img31prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Mulher brasileira, 20 anos, loira, rosto angular com mandíbula forte e bem definida, nariz reto e afilado, lábios naturais com expressão de concentração. Rosto com textura de pele altamente realista e irregular, poros visíveis na região do nariz e bochechas, pequenas manchas solares e micro imperfeições naturais, sem nenhum filtro de suavização, mantendo simetria estrutural forte e traços realistas de esforço físico"],"regras_de_aparencia":{"0":"Cabelo loiro acinzentado com raiz escura preso em um coque alto e bagunçado (messy bun) com alguns fios soltos, tom de pele levemente bronzeado típico brasileiro, textura de pele humana real com poros dilatados, leves desníveis e micro manchas, suor de treino realçando a textura crua e real da pele, musculatura dos braços e ombros extremamente desenvolvida e definida, veias aparentes nos braços","1":"Colar fino e delicado com um pequeno pingente"}},"cena":{"local":"Academia de musculação comercial","ambiente":["Equipamentos de musculação com estofado vermelho e estrutura metálica preta","Barras olímpicas, anilhas de metal empilhadas nos equipamentos","Ambiente movimentado e funcional, com foco profundo no sujeito; outras pessoas desfocadas no fundo"],"atmosfera":"Treino intenso, foco absoluto, estética fitness hardcore sem glamour digital"},"iluminacao":{"tipo":"Luz artificial de academia","luz_principal":"Múltiplas luzes brancas e circulares pendentes no teto, criando iluminação zenital crua que destaca intensamente a definição muscular, além de revelar sem piedade a textura e os poros do rosto","luz_de_preenchimento":"Luz ambiente refletida pelo chão escuro e espelhos distantes, mantendo os fundos escurecidos","contraste":"Alto contraste focado em volume, textura muscular e micro detalhes da pele"},"perspectiva_da_camera":{"pov":"Visão de terceira pessoa, fotografia tirada por outra pessoa agachada ou de um ângulo baixo","angulo":"Ângulo levemente de baixo para cima (low angle), na altura do quadril ou cintura da modelo","distancia":"Plano de corpo inteiro (Full Body / Medium Full Shot)","visibilidade_do_celular":"O celular não aparece na imagem; não é uma selfie no espelho"},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"Brasileira, bodybuilder jovem, atleta focada, fitness lifestyle realista","textura_pele":"Poros bastante aparentes e detalhados nas maçãs do rosto e testa, textura irregular realista com pequenas marcas de acne antigas, sardas leves e manchas solares naturais, pele de uma jovem de 20 anos exposta ao suor intenso, sem qualquer efeito de blur ou embelezamento","expressao":{"olhos":"Focados para baixo, fixos na barra","boca":"Fechada, lábios neutros, demonstrando controle da respiração","emocao":"Concentração intensa, seriedade, preparação para o esforço"},"pose":{"posicao":"Inclinada para frente a partir do quadril, costas retas, joelhos levemente flexionados (preparação ou execução de remada curvada)","apoio":"Pés afastados na largura dos ombros, plantados firmemente no chão emborrachado preto da academia","mao":"Ambas as mãos segurando firmemente uma barra olímpica carregada de pesos, utilizando faixas (straps) pretas de levantamento envoltas nos pulsos e na barra"},"roupa":{"blusa":{"tipo":"Top esportivo (sports bra) com alças duplas finas","caimento":"Justo e compressivo","detalhes":"Tecido canelado, sem costura aparente (seamless), cor cinza claro"},"extra":["Legging de cintura alta combinando, mesmo tecido canelado cinza claro","Meias esportivas brancas de cano médio","Tênis brancos robustos (estilo Air Force 1)","Straps de pulso pretos"]}},"qualidade_da_imagem":{"foco":"Foco cravado na modelo, perfeitamente nítido em seu rosto capturando cada poro e no detalhe da barra; fundo com leve desfoque de profundidade de campo","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma foto amadora real postada online, pele crua e não editada","artefatos_de_sensor":"Leve ruído de cor (color noise) perceptível nas áreas escuras do teto da academia ao fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS realçando as imperfeições da pele"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Barra Olímpica', 'Remada Curvada', 'Straps', 'Bodybuilder'],
  },

  // ==========================================
  // POST 32: IMAGEM - ACADEMIA BARRA W ROSCA DIRETA
  // ==========================================
  {
    id: 'academia-barra-w-32',
    postNumber: '32',
    title: 'Academia Atleta Homem Negro Rosca Barra W',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img32prompt.webp',
    posterUrl: '/imagensprompt/img32prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["homem negro brasileiro, 25 anos, formato de rosto oval, maxilar definido, barba preta cheia e aparada, nariz com base larga, lábios grossos naturais, olhos escuros, sobrancelhas arqueadas e expressivas, sem assimetria pronunciada"],"regras_de_aparencia":{"detalhes_faciais_e_pele":"cabelo crespo curto com textura natural, pele negra com brilho de suor, textura de pele altamente realista e irregular, poros bem visíveis e abertos, micro marcas de expressão, pequenas manchas naturais e desníveis realistas no rosto","marcas_corporais":"sem tatuagens ou piercings visíveis"}},"cena":{"local":"academia de musculação comercial","ambiente":["espelhos grandes ao fundo","outros frequentadores desfocados no reflexo","organizado, equipamentos de ginástica visíveis, iluminação linear no teto"],"atmosfera":"focada, fitness, treino pesado"},"iluminacao":{"tipo":"luz artificial de academia (lâmpadas LED longas no teto)","luz_principal":"luz vindo de cima, criando destaques nos ombros e peito","luz_de_preenchimento":"luz ambiente difusa refletida pelos espelhos, algumas sombras sob o pescoço e músculos","contraste":"médio-alto, destacando a definição muscular"},"perspectiva_da_camera":{"pov":"foto tirada por terceira pessoa ou tripé","angulo":"frontal, altura do peito","distancia":"plano médio (cintura para cima)","visibilidade_do_celular":"não aparece"},"assunto":{"genero":"masculino","idade":"25 anos","vibe":"atleta brasileiro, determinado, focado no treino","textura_pele":"suor leve, poros muito aparentes no rosto e ombros, textura irregular da pele com micro marcas e pequenas manchas naturais no rosto, pele hidratada e brilhante sob a luz, veias saltadas e realistas nos braços","expressao":{"olhos":"olhando para frente e ligeiramente para cima, concentrado","boca":"fechada, neutra","emocao":"concentração, esforço contido"},"pose":{"posicao":"em pé, pernas ligeiramente afastadas","mao":"segurando uma barra W com anilhas, executando rosca direta"},"roupa":{"blusa":{"tipo":"regata branca cavada","caimento":"justa no peito, solta na barriga","detalhes":"tecido de algodão simples, dobras naturais"},"extra":["bermuda preta esportiva","fones de ouvido over-ear pretos grandes","pulseiras no pulso direito","relógio escuro no pulso esquerdo"]}},"qualidade_da_imagem":{"foco":"foco nítido no sujeito, fundo em desfoque suave (bokeh)","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"pequeno brilho no metal da barra","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Barra W', 'Rosca Direta', 'Atleta Masculino', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 33: IMAGEM - ACADEMIA CABLE CROSSOVER MALE
  // ==========================================
  {
    id: 'academia-cable-crossover-33',
    postNumber: '33',
    title: 'Academia Cable Crossover Chest Fly',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img33prompt.webp',
    posterUrl: '/imagensprompt/img33prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Homem brasileiro, 25 anos, maxilar forte e angular. Nariz reto. Lábios finos em estado natural com micro rachaduras. Olhos claros, olhar fixo e concentrado. Assimetria natural mantida, estrutura óssea bem definida no rosto, presença de poros bem demarcados, sardas sutis, pequenas manchas de sol e textura de pele humana real."],"regras_de_aparencia":{"cabelo":"Cabelo loiro escuro/castanho claro, corte texturizado no topo com franja levemente despenteada, laterais mais curtas. Tom de pele claro. Textura de pele extremamente realista e irregular, com poros dilatados e visíveis sob a luz forte, micro cicatrizes de acne, textura áspera, brilho de oleosidade e suor natural, barba rala e curta cobrindo maxilar e queixo."}},"cena":{"local":"Academia de musculação","ambiente":["Estrutura metálica preta de máquina de cabos (cable crossover)","Luzes de teto retangulares brilhantes desfocadas no fundo","Ambiente de treino escuro, focado e com equipamento industrial ao redor"],"atmosfera":"Intensa, focada, determinação de treino pesado"},"iluminacao":{"tipo":"Luz artificial dramática de academia","luz_principal":"Luz de teto (overhead) forte e fria vindo de cima e levemente por trás, criando um contorno (rim light) brilhante no cabelo, ombros e braços.","luz_de_preenchimento":"Sombras profundas e marcadas no rosto, pescoço e parte inferior do corpo; alto contraste geral.","contraste":"Alto contraste (High-key highlights, low-key shadows)"},"perspectiva_da_camera":{"pov":"Câmera de terceiro, ponto de vista de um observador próximo","angulo":"Ligeiramente de baixo para cima (low angle shot), na altura do peito","distancia":"Plano médio (Medium shot), enquadrando da cabeça até o meio da coxa","visibilidade_do_celular":"Não aparece"},"assunto":{"genero":"Masculino","idade":"25 anos","vibe":"Atleta fitness brasileiro, fisiculturista em treinamento focado","textura_pele":"Pele com oleosidade natural e suor de esforço físico, textura altamente irregular, poros dilatados e bastante visíveis nas bochechas e nariz, presença de pequenas manchas de sol, pintas sutis, micro cicatrizes reais e textura áspera da barba por fazer.","expressao":{"olhos":"Olhando fixamente para frente e levemente para baixo, foco intenso no movimento.","boca":"Fechada, lábios levemente tensionados pelo esforço físico.","emocao":"Concentração profunda, seriedade, esforço físico."},"pose":{"posicao":"Tronco levemente inclinado para frente, braços estendidos puxando os cabos em um movimento de crucifixo (chest fly), músculos dos braços tensionados.","apoio":"Em pé, base estabilizada.","mao":"Mãos segurando firmemente os puxadores pretos (D-handles) da máquina."},"roupa":{"blusa":{"tipo":"Camiseta de manga curta","caimento":"Justa nos braços e peitoral, levemente solta no abdômen.","detalhes":"Tecido de algodão branco com estampa estilo college/universitário em tom escuro no peito. Pequeno logo no ombro esquerdo."},"extra":["Shorts esportivo preto com pequeno logo branco na perna esquerda."]}},"qualidade_da_imagem":{"foco":"Foco cravado no rosto, peito e braços do sujeito. Fundo possui forte desfoque (bokeh).","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Leve ruído granulado nas áreas de sombra profunda ao fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Cable Crossover', 'Chest Fly', 'Atleta Masculino', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 34: IMAGEM - ACADEMIA CROSSFIT ATLETA NEGRO
  // ==========================================
  {
    id: 'academia-crossfit-atleta-34',
    postNumber: '34',
    title: 'Academia Atleta Negro Sem Camisa CrossFit',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img34prompt.webp',
    posterUrl: '/imagensprompt/img34prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Homem brasileiro de 25 anos, negro, maxilar definido e quadrado, barba rala bem aparada (stubble), nariz reto de base média, lábios naturais e cheios, olhos escuros focados, estrutura óssea forte, pele com poros visíveis e dilatados, textura irregular realista, pequenas manchas de sol e micro marcas naturais no rosto, assimetria natural mantida"],"regras_de_aparencia":["Cabelo curto sob o boné, pele negra com tom quente, textura de pele do rosto com imperfeições ultra-realistas (poros, pequenas manchas), corpo com leve brilho de suor natural, musculatura extremamente definida, veias aparentes nos braços e pernas","Brinco na orelha esquerda, colar com pingente de cruz prateado"]},"cena":{"local":"Academia de ginástica (estilo CrossFit ou musculação com pesos livres)","ambiente":["Racks de agachamento pretos, barras olímpicas e anilhas ao fundo","Ventilador de chão cromado à esquerda, caixa pliométrica preta e bola medicinal cinza no chão","Ambiente organizado, estilo industrial"],"atmosfera":"Foco, determinação, ambiente de treino pesado e estético"},"iluminacao":{"tipo":"Luz artificial mista de teto de academia","luz_principal":"Luz superior difusa (overhead lighting) criando sombras dramáticas e destacando a definição muscular do abdômen e peitoral, revelando a textura dos poros no rosto","luz_de_preenchimento":"Luz rebatida do chão emborrachado escuro, gerando sombras densas","contraste":"Alto contraste para destacar a volumetria corporal e as imperfeições da pele"},"perspectiva_da_camera":{"pov":"Fotografia de corpo inteiro tirada por terceiros (não é selfie)","angulo":"Frontal, nível dos olhos levemente de baixo para cima (low angle sutil) realçando o porte físico","distancia":"Plano inteiro (cabeça aos pés no enquadramento)","visibilidade_do_celular":"O celular não aparece"},"assunto":{"genero":"Masculino","idade":"25 anos","vibe":"Jovem brasileiro, fitness, atleta dedicado, estético","textura_pele":"Poros aparentes no rosto, textura levemente irregular com pequenas marcas e manchas naturais (hiperpigmentação leve), pele do corpo hidratada com leve brilho de suor natural, vascularização (veias) muito visível nos braços e panturrilhas","expressao":{"olhos":"Olhando para o lado esquerdo do quadro, olhar fixo e sério","boca":"Fechada, lábios relaxados, mostrando textura natural da pele ao redor","emocao":"Concentração, serenidade"},"pose":{"posicao":"De pé, ombros relaxados, peito estufado, tronco levemente rotacionado","apoio":"Em pé sobre piso de borracha preto, perna direita levemente à frente próxima a uma bola medicinal","mao":"Braços soltos ao lado do corpo, mãos relaxadas. Relógio claro no pulso esquerdo"},"roupa":{"blusa":{"tipo":"Sem camisa","caimento":"N/A","detalhes":"N/A"},"extra":["Shorts de treino preto curto de tactel","Meias brancas de cano médio","Tênis esportivo branco texturizado","Boné preto virado para trás"]}},"qualidade_da_imagem":{"foco":"Foco nítido no sujeito inteiro, capturando micro-detalhes do rosto, fundo levemente desfocado","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi, mas preservando a textura de pele imperfeita","realismo":"parece uma foto real tirada com iPhone postada online sem filtros de beleza","artefatos_de_sensor":"Leve granulação nas áreas escuras do fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS, zero suavização de pele"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'CrossFit', 'Atleta Negro', 'Sem Camisa', 'Corpo Inteiro'],
  },

  // ==========================================
  // POST 35: IMAGEM - ACADEMIA BANCO HALTERES ESPELHO
  // ==========================================
  {
    id: 'academia-banco-halteres-35',
    postNumber: '35',
    title: 'Academia Banco Halteres Tatuagem Mirror Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img35prompt.webp',
    posterUrl: '/imagensprompt/img35prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Homem brasileiro de 25 anos com maxilar quadrado e marcado, barba curta bem aparada castanha escura. Nariz reto, lábios finos e naturais. Olhos focados e escuros, pele com textura irregular, marcas e manchas naturais, assimetria natural mantida"],"regras_de_aparencia":{"pele_e_cabelo":"Cabelo oculto por um boné, tom de pele levemente bronzeado, textura de pele ultra-realista e irregular com poros dilatados bem visíveis no rosto, pequenas manchas solares, pintas e micro marcas naturais, leve oleosidade natural de treino, veias muito proeminentes nos braços","marcas_corporais":"Tatuagens visíveis no antebraço esquerdo estendendo-se até as costas da mão esquerda"}},"cena":{"local":"Academia de ginástica moderna com parede inteira de espelho","ambiente":["Fileira de esteiras à esquerda alinhadas sob uma parede com detalhes em arcos","Equipamentos de musculação variados, bancos, kettlebells coloridos e placa iluminada vermelha de EXIT refletidos ao fundo","Ambiente limpo, vazio, organizado e minimalista"],"atmosfera":"Treino noturno ou solitário, focada, estética gym rat, vibe esportiva urbana"},"iluminacao":{"tipo":"Luz artificial interna de teto","luz_principal":"Múltiplos spots de luz de teto (recessed lighting) projetando luz de cima para baixo e destacando os contornos musculares","luz_de_preenchimento":"Luz ambiente suave refletida pelo espelho da academia","contraste":"Médio-alto, com sombras marcadas abaixo da aba do boné e do queixo"},"perspectiva_da_camera":{"pov":"Selfie no espelho de corpo inteiro","angulo":"Frontal, na altura do peito, levemente inclinado de cima para baixo","distancia":"Plano médio-longo, enquadrando desde o topo da cabeça até os tênis apoiados nos halteres","visibilidade_do_celular":"Celular segurado na vertical na mão esquerda, refletido perfeitamente no espelho, modelo cinza/prata tipo iPhone Pro"},"assunto":{"genero":"Masculino","idade":"25 anos","vibe":"Fitness, fisiculturista casual, focado, atlética","textura_pele":"Pele com oleosidade e suor leves, textura irregular com poros bem dilatados e visíveis na face, micro marcas de expressão, manchas sutis e imperfeições reais, braços hiper-vascularizados com veias grossas aparentes","expressao":{"olhos":"Olhando fixamente para a tela do próprio celular refletida no espelho","boca":"Lábios fechados, relaxados","emocao":"Neutra, concentrada, séria"},"pose":{"posicao":"Sentado de frente para o espelho em um banco de musculação preto, tronco levemente inclinado para frente, pernas afastadas","apoio":"Ambos os pés calçados apoiados sobre dois halteres sextavados pretos no chão","mao":"Mão direita descansando relaxada sobre a coxa direita, mão esquerda segurando firme o celular para a foto"},"roupa":{"blusa":{"tipo":"Camiseta de manga curta off-white ou cinza bem claro","caimento":"Justa, destacando a musculatura do peitoral, ombros e braços","detalhes":"Tecido esportivo liso, costura estilo raglan nos ombros"},"extra":["Calça de moletom larga cinza chumbo","Tênis esportivos brancos com detalhes escuros","Boné preto","Fones de ouvido sem fio brancos nos ouvidos"]}},"qualidade_da_imagem":{"foco":"Foco cravado no reflexo principal do sujeito e do celular no espelho","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Leve granulação nas áreas escuras da calça e do fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Banco de Musculação', 'Halteres', 'Tatuagem', 'iPhone Mirror Selfie'],
  },

  // ==========================================
  // POST 36: IMAGEM - ACADEMIA COQUETELEIRA E TOALHA
  // ==========================================
  {
    id: 'academia-coqueteleira-toalha-36',
    postNumber: '36',
    title: 'Academia Atleta Coqueteleira e Toalha no Ombro',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img36prompt.webp',
    posterUrl: '/imagensprompt/img36prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["rosto masculino com estrutura óssea bem definida, maxilar quadrado e forte, maçãs do rosto marcadas, nariz reto e proporcional, lábios de espessura média com aparência natural, olhos claros (aparentemente azuis ou cinzas) com olhar direto, sobrancelhas retas e espessas, barba rala por fazer, proporções faciais simétricas"],"regras_de_aparencia":{"detalhes":"homem brasileiro, cabelo castanho escuro curto e levemente despenteado para cima, tom de pele claro a médio com bronzeado natural, textura de pele altamente realista e irregular com poros bem visíveis no nariz e bochechas, pequenas manchas de sol, micro marcas de expressão e pintas naturais, leve brilho natural de suor no rosto e braços, musculatura bem definida nos braços e peitoral"}},"cena":{"local":"interior de uma academia de ginástica moderna","ambiente":["equipamentos de musculação escuros e suportes de peso desfocados ao fundo","grandes espelhos refletindo o espaço e janelas no fundo","chão emborrachado escuro, ambiente limpo e organizado com estética industrial"],"atmosfera":"focada, fitness, pós-treino, disciplinada"},"iluminacao":{"tipo":"iluminação artificial mista de teto de academia com possível entrada de luz natural suave difusa","luz_principal":"luz suave e ampla vinda de cima e ligeiramente de frente, destacando o volume muscular e os traços faciais","luz_de_preenchimento":"sombras suaves que esculpem os músculos sob a camiseta e ao redor do pescoço e braços","contraste":"contraste médio a alto"},"perspectiva_da_camera":{"pov":"retrato em terceira pessoa, fotógrafo ou tripé posicionado na altura dos olhos do sujeito","angulo":"frontal e nivelado","distancia":"plano médio, enquadrando o sujeito da metade das coxas até um pouco acima da cabeça","visibilidade_do_celular":"o celular não está visível na cena"},"assunto":{"genero":"masculino","idade":"25 anos","vibe":"atleta brasileiro focado, estilo de vida saudável, confiante, autêntico","textura_pele":"textura irregular com alto nível de detalhes, poros dilatados evidentes na zona T, manchas de sol sutis, micro marcas e cicatrizes naturais, pintas autênticas, leve vermelhidão de esforço, barba curta natural, oleosidade e suor de treino realistas","expressao":{"olhos":"olhando diretamente e fixamente para a lente da câmera, olhar calmo e seguro","boca":"fechada, relaxada, expressão neutra","emocao":"neutra, confiante, em repouso após esforço"},"pose":{"posicao":"em pé, postura ereta, corpo levemente virado de lado mas rosto voltado para a frente","mao":"mão direita segurando firmemente uma coqueteleira preta opaca na altura do quadril, mão esquerda segurando as pontas de uma toalha branca que repousa sobre o ombro esquerdo"},"roupa":{"blusa":{"tipo":"camiseta de manga curta com gola careca","caimento":"justa ao corpo, marcando o peitoral e os braços","detalhes":"tecido em tom cinza escuro mescla (heather grey), amassados leves na região do abdômen indicando movimento"},"extra":["bermuda esportiva preta de tecido leve","toalha branca felpuda de academia no ombro","relógio esportivo preto (smartwatch) no pulso esquerdo"]}},"qualidade_da_imagem":{"foco":"foco nítido e cravado no rosto e tronco do sujeito, capturando cada detalhe das imperfeições da pele, com desfoque de profundidade de campo (bokeh) suave no fundo","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"leve ruído de compressão nas áreas mais escuras","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Coqueteleira', 'Toalha no Ombro', 'Atleta Masculino', 'Pós-Treino'],
  },

  // ==========================================
  // POST 37: IMAGEM - ACADEMIA BIA FITNESS INFLUENCER
  // ==========================================
  {
    id: 'academia-bia-influencer-37',
    postNumber: '37',
    title: 'Academia Bia Brazilian Fitness Influencer',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img37prompt.webp',
    posterUrl: '/imagensprompt/img37prompt.webp',
    prompt:
      'Bia, a 23-year-old Brazilian fitness influencer, has lightly tanned skin with a warm golden undertone. Her face is oval and well-proportioned, with high cheekbones and smooth, radiant skin with a natural glow. Her eyes are almond-shaped and a vibrant brown, framed by long, curled lashes and light brown, well-arched eyebrows. Her nose is thin, with a slightly upturned tip. Her lips are full and defined, often enhanced with a rosy nude gloss. Her hair is long, straight, and brown with subtle natural highlights. She has a toned yet feminine body: defined abs, a slim waist, rounded shoulders, and slender but athletic arms and legs. Her silhouette is hourglass-shaped, with visible muscle tone, especially in her abdomen and upper body, but without excessive muscle—maintaining a delicate and attractive fitness model look. Her typical look includes form-fitting sportswear—usually tank tops or cropped tops with thin straps in vibrant neon colors like hot pink or black, high-waisted jeans or athletic pants, and small gold hoop earrings or understated accessories. Her makeup is minimalist yet radiant: blush, soft eyeshadow, light highlighter, and a confident half-smile. She speaks with a São Paulo accent and uses popular slang like "meu," "chocada," or "tá passada?" Her personality is confident, seductive, and magnetic—the archetype of a modern, alluring fitness muse. She has a bold and outgoing tone and likes to look directly at the camera in selfies or close-ups. She often appears in urban or neon-lit settings, podcast studios, luxury shops, or modern interiors with soft, cinematic lighting and steady handheld or slow-motion camera shots. The ideal framing for videos includes vertical close-ups or medium shots focusing on her face, torso, and expressive movements.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Bia Influencer', 'Brazilian Muse', 'Golden Undertone', 'Hourglass'],
  },

  // ==========================================
  // POST 38: IMAGEM - ACADEMIA CROPPED BRANCO BONE
  // ==========================================
  {
    id: 'academia-cropped-bone-38',
    postNumber: '38',
    title: 'Academia Cropped Branco e Boné Mirror Selfie',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img38prompt.webp',
    posterUrl: '/imagensprompt/img38prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Mulher branca, maxilar bem definido, nariz reto levemente empinado pelo ângulo, lábios carnudos com sorriso sutil e natural, olhos escuros focados no reflexo do espelho, rosto parcialmente ocultado pelo celular"],"regras_de_aparencia":{"caracteristicas":"Cabelo loiro claro, longo e ondulado caindo pelas costas, pele levemente bronzeada com brilho suave e aspecto hidratado, forte definição muscular nas coxas, panturrilhas e braços, pele lisa sem imperfeições marcantes"}},"cena":{"local":"Área de pesos livres em uma academia moderna","ambiente":["Piso de borracha preta e plataforma de levantamento de peso em madeira","Equipamentos de musculação pretos, racks e espelhos amplos","Ambiente movimentado com homens treinando desfocados ao fundo"],"atmosfera":"Treino focado, gym selfie casual, estilo fitness contemporâneo"},"iluminacao":{"tipo":"Luz artificial de academia mista","luz_principal":"Iluminação de teto direcional e suave que incide sobre a modelo, destacando o relevo muscular das pernas e braços com brilho sutil na pele","luz_de_preenchimento":"Luz ambiente rebatida pelo espelho e piso, criando sombras suaves e naturais na lateral do corpo","contraste":"Contraste médio, destacando bem os volumes do corpo sem sombras duras"},"perspectiva_da_camera":{"pov":"Selfie no espelho (mirror selfie)","angulo":"Ângulo lateral em perfil 3/4, câmera posicionada na altura do queixo/rosto","distancia":"Plano americano estendido, cortando na altura dos tornozelos","visibilidade_do_celular":"Celular preto (iPhone com 3 lentes) claramente visível no espelho, segurado na vertical em frente ao rosto"},"assunto":{"genero":"Feminino","idade":"adulto (21+)","vibe":"Atlética, estilosa, focada, estética lifestyle","textura_pele":"Pele do corpo lisa e tonificada, com reflexos sutis de luz evidenciando hidratação natural e contorno muscular","expressao":{"olhos":"Olhando diretamente para a tela do celular através do reflexo do espelho","boca":"Lábios fechados, esboçando um sorriso muito leve e relaxado","emocao":"Confiante, casual, satisfeita com o treino"},"pose":{"posicao":"De perfil para o espelho com o tronco levemente virado para a frente, perna direita ligeiramente à frente flexionada para realçar os glúteos e quadríceps","apoio":"Peso distribuído no pé esquerdo que está reto, com a ponta do pé direito tocando o chão suavemente","mao":"Mão direita segurando firmemente o celular na altura do rosto, mão esquerda repousando com os dedos relaxados sobre a lateral da coxa/glúteo"},"roupa":{"blusa":{"tipo":"Camiseta cropped branca de mangas curtas","caimento":"Solta e curta, terminando acima da linha da cintura, formato boxy","detalhes":"Tecido liso de algodão/sintético, cor branca sólida"},"extra":["Shorts esportivo tipo ciclista preto, curto, justo e de cintura alta","Boné aba curva bege claro","Fones de ouvido grandes pretos (over-ear) sobre o boné","Tênis esportivo branco"]}},"qualidade_da_imagem":{"foco":"Foco cravado no reflexo da modelo no espelho, mantendo o fundo do ambiente visivelmente fora de foco","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Cropped Boxy', 'Boné Bege', 'Over-Ear Headphones', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 39: IMAGEM - ACADEMIA GLUTEO NA POLIA
  // ==========================================
  {
    id: 'academia-gluteo-polia-39',
    postNumber: '39',
    title: 'Academia Glúteo na Polia Luz Natural',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img39prompt.webp',
    posterUrl: '/imagensprompt/img39prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["Mulher caucasiana vista de perfil, maxilar bem definido, nariz reto, lábios naturais levemente ressecados e fechados sem maquiagem, olhos focados voltados para baixo, estrutura óssea marcada, pele do rosto com textura irregular humana, poros visíveis no nariz e bochechas, pequenas sardas e manchas solares naturais"],"regras_de_aparencia":["Cabelo loiro escuro com mechas mais claras, preso em um coque alto e bagunçado com mechas curtas soltas contornando o rosto e levemente grudadas pelo suor, pele levemente bronzeada com brilho natural de suor, textura de pele crua e realista com poros aparentes e pequenas imperfeições de tom, tônus muscular evidente nos braços e pernas"]},"cena":{"local":"Academia moderna e ampla","ambiente":["Máquina de polias e pesos empilhados em primeiro plano","Grandes janelas trazendo luz natural ao fundo e outras máquinas de musculação pretas","Ambiente limpo, organizado, com outras pessoas borradas ao fundo treinando"],"atmosfera":"Foco, fitness, treino diurno, energia ativa"},"iluminacao":{"tipo":"Luz mista (natural difusa e artificial de teto)","luz_principal":"Luz natural suave vindo das janelas à esquerda e à frente, iluminando o perfil e os braços da modelo, revelando micro-detalhes, poros e a textura real da pele","luz_de_preenchimento":"Luz ambiente da academia preenchendo as sombras nas costas e pernas","contraste":"Contraste médio-baixo, sombras suaves e transições naturais"},"perspectiva_da_camera":{"pov":"Visão de terceira pessoa, fotógrafo posicionado na lateral da modelo","angulo":"Ângulo neutro, posicionado na altura da cintura/peito da modelo","distancia":"Plano de corpo inteiro/plano americano","visibilidade_do_celular":"O celular não aparece na imagem"},"assunto":{"genero":"Feminino","idade":"adulto (21+)","vibe":"Atlética, dedicada, gym girl estética, focada, suada do treino","textura_pele":"Textura de pele humana crua e altamente realista, poros dilatados visíveis de perto, marcas e manchas naturais de pele sem maquiagem, oleosidade e suor escorrendo levemente, leve vermelhidão de esforço físico no rosto","expressao":{"olhos":"Olhando para baixo, fixos no chão ou na estrutura da máquina, pálpebras semi-cerradas em concentração","boca":"Lábios fechados, relaxados, sem tensão","emocao":"Concentração profunda, seriedade, foco no exercício"},"pose":{"posicao":"Corpo inclinado para frente, perna direita estendida para trás tensionando o cabo (exercício de glúteo na polia)","apoio":"Pé esquerdo firme no chão suportando o peso, tronco estabilizado","mao":"Ambas as mãos segurando firmemente a haste vertical de metal da máquina de polia"},"roupa":{"blusa":{"tipo":"Top/body esportivo rosa claro com decote em U e alças finas cruzadas nas costas","caimento":"Justo ao corpo, compressão esportiva","detalhes":"Tecido sintético liso e elástico, sem estampas"},"extra":["Shorts esportivo rosa claro combinando, estilo ciclista curto","Tornozeleira preta de cabo de aço presa no tornozelo direito","Tênis esportivo branco","Meias curtas brancas"]}},"qualidade_da_imagem":{"foco":"Foco cravado na modelo e na estrutura da máquina, com o fundo suavemente desfocado","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma foto real de iPhone tirada por um amigo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS realçando a textura da pele"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Glúteo na Polia', 'Luz Natural', 'Conjunto Rosa', 'Cabo de Aço'],
  },

  // ==========================================
  // POST 40: IMAGEM - ACADEMIA VESTIARIO AZUL MARINHO
  // ==========================================
  {
    id: 'academia-vestiario-canelado-40',
    postNumber: '40',
    title: 'Academia Vestiário Conjunto Canelado Azul Marinho',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img40prompt.webp',
    posterUrl: '/imagensprompt/img40prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"face_identity":["rosto oval, perfil lateral com maxilar definido, nariz de ponta fina, lábios cheios com batom ou gloss rosado, delineado gatinho escuro nos olhos, sobrancelhas escuras bem desenhadas, assimetria natural mantida"],"regras_de_aparencia":{"caracteristicas":"jovem brasileira de 19 anos, cabelo longo liso castanho escuro com franja lateral longa, pele clara com bronzeado suave, textura de pele com alta fidelidade orgânica, poros sutis no rosto sob a maquiagem, pele do corpo exibindo dobras naturais e levíssima textura realista na parte posterior da coxa","detalhes":"pequenas tatuagens finas nos dedos da mão direita, pequena tatuagem circular no antebraço direito, unhas pintadas de preto"}},"cena":{"local":"frente a um espelho em um vestiário ou corredor de academia","ambiente":["parede com textura cinza e uma pequena placa preta ao fundo","piso de cerâmica clara em primeiro plano e piso emborrachado quadriculado cinza e branco ao fundo","ambiente limpo, bem iluminado, organizado"],"atmosfera":"vaidade, fitness, pós-treino, exibindo resultados corporais, casual"},"iluminacao":{"tipo":"luz artificial fluorescente ou LED de teto","luz_principal":"iluminação de teto clara e difusa que rebate no espelho, criando brilho nos tecidos canelados e na pele","luz_de_preenchimento":"luz ambiente refletida nas paredes cinzas e chão claro, iluminando o rosto suavemente sem sombras duras","contraste":"médio, destacando bem os volumes corporais com luzes de recorte naturais"},"perspectiva_da_camera":{"pov":"selfie no espelho (mirror selfie)","angulo":"ângulo na altura dos ombros, câmera levemente inclinada para pegar o reflexo do corpo inteiro/plano americano","distancia":"plano americano (corte um pouco abaixo dos joelhos)","visibilidade_do_celular":"o celular (iPhone azul claro com capinha transparente) aparece claramente no espelho, segurado pela mão direita da modelo perto do queixo/ombro"},"assunto":{"genero":"feminino","idade":"19 anos","vibe":"jovem brasileira, fitness influencer, confiante, atraente","textura_pele":"pele do rosto com textura de maquiagem realista e poros finos visíveis; pele do corpo com brilho natural, textura de pele humana real e pequenas imperfeições orgânicas visíveis sob a luz","expressao":{"olhos":"olhando por cima do ombro, de soslaio, diretamente para o reflexo do celular no espelho","boca":"leve sorriso de canto, confiante e relaxado","emocao":"confiança, flerte leve, satisfação com o físico"},"pose":{"posicao":"em pé, de costas/lado para o espelho, tronco torcido para trás para olhar por cima do ombro, postura que empina os glúteos","apoio":"pernas ligeiramente afastadas, peso levemente transferido, pés no chão","mao":"mão direita segurando o celular na frente do corpo, mão esquerda relaxada encostada na lateral da coxa"},"roupa":{"blusa":{"tipo":"top esportivo curto com alças finas reguláveis","caimento":"justo ao corpo","detalhes":"tecido canelado (ribbed) em tom azul marinho escuro/azul meia-noite"},"extra":["short esportivo muito curto e de cintura alta do mesmo conjunto","short com textura canelada (ribbed) azul marinho escuro, estilo sem costura (seamless)","relógio digital tipo smartwatch preto no pulso direito","pulseira fina dourada no pulso esquerdo","anéis dourados nos dedos da mão esquerda"]}},"qualidade_da_imagem":{"foco":"foco no reflexo do espelho, rosto e corpo nítidos, fundo um pouco mais suave","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Canelado Ribbed', 'Azul Marinho', 'Vestiário', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 41: IMAGEM - ACADEMIA DIGITAL CAMERA MARROM
  // ==========================================
  {
    id: 'academia-digital-camera-41',
    postNumber: '41',
    title: 'Academia Câmera Digital Conjunto Marrom',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img41prompt.webp',
    posterUrl: '/imagensprompt/img41prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Rosto de perfil, estrutura óssea do maxilar bem definida, nariz arrebitado pequeno, lábios com aparência natural, olhos focados no reflexo, rosto ligeiramente virado para baixo, assimetria natural mantida, sem alteração facial"],"regras_de_aparencia":{"descricao":"Cabelo loiro escuro ou castanho claro preso em um coque baixo prático, pele intensamente bronzeada, textura de pele do corpo lisa com brilho natural de suor leve destacando o tônus muscular"}},"cena":{"local":"Interior de uma academia de ginástica ampla e moderna","ambiente":["Máquinas de musculação pesadas na cor preta e bancos de treino","Pessoas malhando desfocadas ao fundo","Ambiente organizado, com piso de borracha escuro e teto aparente estilo industrial"],"atmosfera":"Foco, treino intenso, estética de academia de alto padrão, vibe fitness \'gym rat\'"},"iluminacao":{"tipo":"Iluminação artificial de academia por painéis tubulares no teto","luz_principal":"Luz linear direta vinda do teto, criando sombras definidas sob a musculatura das costas e bumbum","luz_de_preenchimento":"Luz ambiente refletida pelo grande espelho e pelo piso, suavizando levemente as sombras","contraste":"Médio a alto, acentuando intensamente o volume do corpo e definição muscular","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"Selfie de corpo inteiro capturada no espelho","angulo":"Câmera posicionada aproximadamente na altura do peito/ombro, com lente apontando ligeiramente para baixo","distancia":"Enquadramento de corpo inteiro (cabeça aos pés)","visibilidade_do_celular":"Câmera digital compacta preta (não celular) segurada pela mão direita na altura do ombro direito"},"assunto":{"genero":"Feminino","idade":"adulto (21+)","vibe":"Fitness influencer, hipertrofia, dedicada aos treinos","textura_pele":"Pele do corpo lisa e tonificada, brilho de leve suor ou hidratação refletindo nas costas e ombros, sem poros ou manchas proeminentes visíveis à distância","expressao":{"olhos":"Olhando fixamente para o visor da câmera refletida no espelho","boca":"Lábios fechados, relaxados","emocao":"Concentrada, neutra, confiante"},"pose":{"posicao":"De costas para o espelho, tronco torcido para a direita para mostrar o glúteo e as costas, rosto virado por cima do ombro","apoio":"Peso distribuído na perna direita semiflexionada, perna esquerda esticada para trás apoiada na ponta do pé","mao":"Mão direita segurando firmemente a câmera fotográfica, braço esquerdo flexionado cruzando a frente do corpo"},"roupa":{"blusa":{"tipo":"Top esportivo curto estilo nadador cruzado na frente","caimento":"Justo e ajustado ao corpo","detalhes":"Tecido liso esportivo na cor marrom"},"extra":["Legging de cintura alta sem costura (seamless) na cor marrom combinando com o top, marca pequena visível na lombar","Fones de ouvido grandes prateados ou brancos cobrindo as orelhas","Meias brancas de cano médio vestidas por cima da bainha da legging","Tênis esportivos grandes/chunky brancos e off-white com cadarços","Pulseira prateada fina no pulso direito","Pequenos anéis na mão direita"]}},"qualidade_da_imagem":{"foco":"Foco cravado na modelo em primeiro plano; academia e pessoas ao fundo levemente desfocadas pelo depth of field","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Granulação de sensor perceptível nas áreas mais escuras do teto e sombras profundas","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'Câmera Compacta', 'Conjunto Marrom', 'Chunky Sneakers', 'Mirror Selfie'],
  },

  // ==========================================
  // POST 42: IMAGEM - ACADEMIA VESTIARIO AZUL CLARO
  // ==========================================
  {
    id: 'academia-vestiario-azul-claro-42',
    postNumber: '42',
    title: 'Academia Vestiário Conjunto Azul Pastel That Girl',
    category: 'academia',
    categoryLabel: 'Academia',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img42prompt.webp',
    posterUrl: '/imagensprompt/img42prompt.webp',
    prompt:
      '{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Mulher com maxilar bem definido, maçãs do rosto altas e marcadas, nariz reto e fino, lábios com leve brilho natural (gloss), olhos claros olhando para a tela do celular, sobrancelhas arqueadas e preenchidas, sorriso leve, mantendo assimetria natural."],"regras_de_aparencia":{"cabelo_e_pele":"Cabelo castanho escuro liso repartido ao meio e preso em um rabo de cavalo baixo. Tom de pele bronzeado. Textura de pele lisa com brilho natural/suor leve típico de pós-treino, aspecto saudável e uniforme.","marcas":"Pequena tatuagem de traço fino (fine line) no antebraço esquerdo."}},"cena":{"local":"Vestiário feminino de academia moderna com iluminação clara.","ambiente":["Armários de madeira clara na lateral","Parede de azulejos brancos retangulares com juntas escuras e teto rebaixado com luzes embutidas","Banco de madeira com estrutura de metal preto e lixeira preta ao fundo; ambiente limpo e organizado."],"atmosfera":"Vibe fitness, limpa, focada em bem-estar e rotina de treino."},"iluminacao":{"tipo":"Iluminação artificial de teto (luzes embutidas fluorescentes/LED).","luz_principal":"Luz vinda de cima (overhead), criando reflexos marcados nos ombros, colo e cabelo.","luz_de_preenchimento":"Luz ambiente refletida pelo espelho e pelos azulejos brancos, suavizando sombras profundas.","contraste":"Contraste médio-alto, iluminado de forma homogênea no primeiro plano.","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"Selfie no espelho.","angulo":"Altura do peito/pescoço, câmera reta em direção ao espelho.","distancia":"Plano médio (Medium shot), mostrando a modelo da cabeça até o meio das coxas.","visibilidade_do_celular":"Smartphone preto com três câmeras traseiras (estilo iPhone) nitidamente segurado na mão direita na frente do peito."},"assunto":{"genero":"Feminino","idade":"adulto (21+)","vibe":"Garota fitness estética \'that girl\', saudável, confiante.","textura_pele":"Pele do corpo levemente oleosa/com brilho de hidratação ou suor, destacando a musculatura dos ombros e abdômen.","expressao":{"olhos":"Focados no reflexo da tela do próprio celular no espelho.","boca":"Sorriso leve de lábios fechados.","emocao":"Confiante, satisfeita, relaxada."},"pose":{"posicao":"Em pé, de frente para o espelho, com o quadril levemente inclinado para o lado.","apoio":"Peso distribuído nas pernas, postura ereta valorizando a silhueta.","mao":"Mão direita segurando firme o celular para a foto; mão esquerda repousando levemente segurando o cós do short do lado esquerdo."},"roupa":{"blusa":{"tipo":"Top esportivo estilo frente única (halter neck) com decote em V profundo.","caimento":"Justo e compressivo no corpo.","detalhes":"Tecido canelado liso sem costuras (seamless), cor azul claro pastel."},"extra":["Shorts esportivo curto de cintura alta do mesmo tecido e cor azul claro pastel (conjunto).","Fone de ouvido sem fio branco (tipo AirPods) na orelha direita visível.","Acessórios dourados sutis: brincos pequenos com pendente, colar fino, pulseira fina no pulso esquerdo, anel na mão direita e smartwatch preto de caixa quadrada no pulso esquerdo."]}},"qualidade_da_imagem":{"foco":"Foco principal cravado na modelo refletida no espelho.","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Leves reflexos (lens flare sutil) causados pelas luzes do teto interagindo com o espelho.","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Academia', 'That Girl', 'Azul Pastel', 'Vestiário', 'AirPods'],
  },

  // ==========================================
  // POST 43: IMAGEM - INFLUENCER BEDROOM MIRROR SELFIE
  // ==========================================
  {
    id: 'influencer-bedroom-mirror-43',
    postNumber: '43',
    title: 'Influencer Bedroom Squat Mirror Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img43prompt.webp',
    posterUrl: '/imagensprompt/img43prompt.webp',
    prompt:
      '{"prompt_type":"photorealistic mirror selfie","subject":{"character":"same as reference image","description":"Thin, slender Gen Z woman with a penetrating, playful gaze.","action_and_expression":{"pose":"Squatting wide in front of a full-length mirror in a bedroom.","hands":"Holding a smartphone with both hands, taking a selfie of her reflection.","expression":"Playful expression with a pout, pink-plum lips, looking directly at the phone."}},"clothing":{"top":"Off-the-shoulder top","bottom":"Short skirt","footwear":"High-heeled sandals, emphasized by the squatting position"},"environment_and_background":{"room_style":"Modern bedroom, slightly messy but inviting","floor":"Soft gray rug","walls":"White walls decorated with minimalist line art above the bed"},"lighting_and_style":{"lighting":"Soft, natural daylight typical of a well-lit room during the day","camera_style":"Candid photo taken with a high-end mobile phone","focus":"Sharp focus on subject with slight natural blur on distant bedroom elements"},"image_quality":{"realism":"Photorealistic","aesthetic":"Casual, unposed, social-media style"},"critical_requirements":{"IDENTITY":"facial features, hair, eye color, and skin tone must exactly match the reference image","POSE":"wide squat mirror selfie holding phone with both hands","EXPRESSION":"playful pout while looking directly at the phone","SETTING":"modern bedroom with gray rug and minimalist wall art","LIGHTING":"soft natural daylight"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Mirror Selfie', 'Bedroom', 'Gen Z', 'Natural Light'],
  },

  // ==========================================
  // POST 44: IMAGEM - INFLUENCER AMUSEMENT PARK NIGHT
  // ==========================================
  {
    id: 'influencer-amusement-park-44',
    postNumber: '44',
    title: 'Influencer Amusement Park Ferris Wheel Night',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img44prompt.webp',
    posterUrl: '/imagensprompt/img44prompt.webp',
    prompt:
      '{"scene":{"location_type":"nighttime amusement area","background":{"ride":"large illuminated Ferris wheel","lights":"multicolored string lights and neon lighting","type":"decorative amusement sign"},"structures":["roller coaster track or beams of other amusement park ride","boardwalk floor"]},"person":{"visible":true,"gender_presentation":"female","pose":"standing, eyes closed, one hand touching hair","clothing":{"top":"dark-colored sleeveless top or bodysuit","bottom":"jeans or shorts","accessories":["small necklace","bracelets","earrings","bag with light strap"]},"hair":{"length":"long","color":"light blonde"},"facial_expression":"closed eyes, relaxed"},"lighting":{"dominant":"neon/amusement park lights","skin_highlights":"soft glow"},"image_characteristics":{"orientation":"portrait","focus":"person in foreground with rides in the background","quality":"night photography with colored lighting"}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Amusement Park', 'Ferris Wheel', 'Neon Night', 'Portrait'],
  },

  // ==========================================
  // POST 45: IMAGEM - INFLUENCER LATINA CAFE SELFIE
  // ==========================================
  {
    id: 'influencer-latina-cafe-45',
    postNumber: '45',
    title: 'Influencer Brasileira Café Moderno Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img45prompt.webp',
    posterUrl: '/imagensprompt/img45prompt.webp',
    prompt:
      'Uma mulher morena, cabelos cacheados, brasileira, latina, deslumbrante, tira uma selfie sorrindo ao ar livre em frente a um café moderno com uma parede de concreto cinza e plantas tropicais ao seu redor. Sua maquiagem é suave, seus óculos estão empoleirados no topo da cabeça. Ela está usando um top verde sem alças, pequenos brincos de flores de ouro e um colar fino de ouro. Pose: ela dá fascínio e expressão confiante. Iluminação natural diurna, uma atmosfera suave e elegante, com a composição e o fundo, Faça-o realista.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Brasileira', 'Café Moderno', 'Plantas Tropicais', 'Top Verde'],
  },

  // ==========================================
  // POST 46: IMAGEM - INFLUENCER GYM BRASIL SHORTS
  // ==========================================
  {
    id: 'influencer-gym-brasil-46',
    postNumber: '46',
    title: 'Influencer Gym Brasil Shorts Mirror Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img46prompt.webp',
    posterUrl: '/imagensprompt/img46prompt.webp',
    prompt:
      '{"subject":{"body":{"description":"An exaggerated hourglass figure with disproportionately large, curvaceous glutes and hips, creating an extreme waist-to-hip ratio with a very narrow, snatched waist. Her shoulders are narrower in comparison to the expansive hips and massive gluteus muscles, which are heavily developed. The spine is visibly curved due to the pose and proportions. Her thighs are thick and muscular.","pose":"Kneeling on the floor, facing away from the camera but looking back over her shoulder, holding a smartphone to take a mirror selfie, showcasing her back and side profile."},"wardrobe":{"top":"A loose white crop t-shirt, tied or lifted slightly at the back.","bottom":"Very short athletic shorts, in the colors of the Brazilian flag (yellow, green, and blue), featuring a prominent white text that reads \'BRASIL\' across the back.","accessories":"Dark smartphone case, simple necklace."}},"camera":{"type":"Smartphone camera (mirror selfie)","lens":"Wide-angle, capturing the full figure and background.","aspect_ratio":"9:16"},"lighting":{"type":"Natural daylight from large windows, combined with soft indoor gym lighting.","quality":"Soft and diffused, highlighting the textures of the skin and clothing, defining the muscular curves.","direction":"From the left and above."},"scene":{"location":"Modern gym.","background":"Large windows showing a cityscape, various pieces of cardio equipment (treadmills, bikes) out of focus, reflections in the large mirror.","props":"A beige exercise mat on the floor."},"texture":{"clothing":"Soft cotton t-shirt, stretchy athletic fabric for the shorts.","skin":"Smooth, natural skin."}}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Brasil Shorts', 'Hourglass', 'Gym Mirror', 'Smartphone'],
  },

  // ==========================================
  // POST 47: IMAGEM - INFLUENCER BATHROOM OOTD
  // ==========================================
  {
    id: 'influencer-bathroom-ootd-47',
    postNumber: '47',
    title: 'Influencer Bathroom OOTD Spontaneous Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img47prompt.webp',
    posterUrl: '/imagensprompt/img47prompt.webp',
    prompt:
      '[STYLE: Casual selfie in the mirror, checking the outfit of the day, spontaneous home photography, smartphone realism], [POSE: Mirror reflection, standing, female figure, 20 years old, slightly leaning forward, holding smartphone with both hands at chest height, one hand interacting with the waistband of her pants, head tilted], [TEXTURES: White ribbed cotton tank top (stretched fabric at the chest), denim shorts, blonde hair in a bun, reflective mirror surface, cold polished marble floor], [SETTING: Interior of a spacious bathroom, arched doorway in the background, sink countertop in the foreground], [LIGHTING AND CAMERA: Warm tungsten lighting on the bathroom ceiling, soft shadows, mirror reflection photographed with a smartphone (iPhone Pro with a triple-lens setup), 24mm main lens, f/1.7, slight motion blur on the hand], [VISUAL EFFECTS: Dust particles on the mirror, slight lens flare due to light superior, natural color correction without editing].',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'OOTD', 'Bathroom Mirror', 'iPhone Pro', 'Ribbed Tank Top'],
  },

  // ==========================================
  // POST 48: IMAGEM - INFLUENCER BEDROOM BRASIL JERSEY
  // ==========================================
  {
    id: 'influencer-bedroom-brasil-jersey-48',
    postNumber: '48',
    title: 'Influencer Bedroom Brasil Crop Top & Shorts',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img48prompt.webp',
    posterUrl: '/imagensprompt/img48prompt.webp',
    prompt:
      '{"subject":{"body":{"physique":"athletic hourglass","proportions":"prominent gluteal muscles, narrow waist-to-hip ratio, defined leg musculature, toned arms and shoulders, shapely posterior chain, fit build","features":"long blonde hair, tongue sticking out, confident pose","skin_texture":"smooth, tan, realistic"},"wardrobe":{"top":"yellow Brazil national soccer team crop top with green trim and two green stripes on shoulders","bottom":"green Brazil national soccer team athletic shorts with yellow waistband, and text reads \'BRASIL\' in yellow on the rear right","accessories":"multiple gold chain bracelets on left wrist, black smartphone in hand, small wrist tattoo","style":"sporty, athletic wear"}},"camera":{"type":"professional mirror selfie","lens":"wide-angle","focus":"sharp focus on subject, slight depth of field","lighting":"soft, diffused indoor ambient light","shot_type":"full body, rear view, vertical orientation"},"scene":{"location":"modern bedroom","elements":"large black dresser, large flat screen television, black tripod fan, white shag rug, wooden flooring, neutral wall color","mirror":"large rectangular mirror reflecting the entire scene","atmosphere":"casual, indoor, personal"},"aspect_ratio":"9:16"}',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Brasil Soccer Team', 'Hourglass', 'Bedroom Mirror', 'Full Body'],
  },

  // ==========================================
  // POST 49: IMAGEM - INFLUENCER IG STORY ROCK ON
  // ==========================================
  {
    id: 'influencer-igstory-rockon-49',
    postNumber: '49',
    title: 'Influencer IG Story Rock On Handheld Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img49prompt.webp',
    posterUrl: '/imagensprompt/img49prompt.webp',
    prompt:
      '9:16 ultra-realistic handheld vertical selfie of a woman in a playful "rock on" pose, shot in authentic IG-story style. Slight motion blur, soft lo-fi texture, warm indoor lighting. Vertical close-up selfie filling most of the story frame, camera very close to the face, imperfect handheld angle. She makes the "rock on" hand gesture with her right hand, fingers clearly visible. Lips pressed in a soft playful kiss, relaxed confident expression, direct eye contact with the camera. IG-story realism - gentle exposure drifting, shallow depth of field, subtle grain, slightly over-smoothed iPhone edges, no cinematic polish. Hair is natural and loose, makeup minimal or optional. Delicate gold rings on her fingers, AirPods, shoulders framed with a minimal white tank top. Neutral indoor background softly out of focus. No text on screen, no stickers, only the raw story-style selfie.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'IG Story', 'Rock On', 'Lo-Fi Realism', 'AirPods'],
  },

  // ==========================================
  // POST 50: IMAGEM - INFLUENCER FAZENDA BRASILEIRA STORIES
  // ==========================================
  {
    id: 'influencer-fazenda-stories-50',
    postNumber: '50',
    title: 'Influencer Fazenda Brasileira Instagram Stories',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img50prompt.webp',
    posterUrl: '/imagensprompt/img50prompt.webp',
    prompt:
      'Ultra-realistic, hand-held vertical selfie of a 21-year-old blonde woman in a relaxed pose, in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, natural lighting, daylight. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight variation in exposure, shallow depth of field, subtle grain, edges slightly softened by the iPhone, no cinematic retouching. Her face is slim and symmetrical, like a model\'s, her teeth are white and aligned, her skin is clear, youthful and attractive; Her hair is tied up in a bun. No makeup. The scene takes place in an open-air setting, like a typical Brazilian farm, a farm with banana trees, chickens, plenty of land, trees, and vegetation all around. Audio: The woman brings the camera close to her face and says in Brazilian Portuguese: "É difícil de acreditar que eu não sou real né? Mas isso é porque eu sou linda, eu entendo!". After the first sentence, the woman laughs naturally. After the laugh, the woman speaks again: "O passo a passo pra gerar vídeos assim está no link, só clicar!". Shoulders framed by a white tank top with thin straps. Neutral and slightly blurred background. No text on the screen, no stickers, just the selfie in storyboard style.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Fazenda', 'Instagram Stories', 'Loiro Coque', 'Outdoor Daylight'],
  },

  // ==========================================
  // POST 51: IMAGEM - INFLUENCER ELEVATOR METALLIC SELFIE
  // ==========================================
  {
    id: 'influencer-elevator-metallic-51',
    postNumber: '51',
    title: 'Influencer Elevator Mirror Selfie Tattoos',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img51prompt.webp',
    posterUrl: '/imagensprompt/img51prompt.webp',
    prompt:
      'Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera mirror selfie of a Brazilian woman inside a metal elevator. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. Oval face with well-defined jawline, dark arched eyebrows, dark almond-shaped brown eyes, straight nose with thin tip, full lips with nude/rose gloss, light makeup. Long straight dark wet-looking hair slicked back falling over shoulders. Intensely tanned skin with visible bikini tan lines on the chest, natural moisture/sweat shine on skin, realistic irregular skin texture with fine visible pores on nose and cheeks, micro expression marks, small natural sun spots. Extensive tattoos covering right forearm and upper arm, small tattoos on stomach, tattoos on left hand and wrist. Small earrings, rings on both hands, multiple fabric and metal bracelets on left wrist, metallic bracelet on right wrist. Wearing a dark brown bandeau tube top stretched tight on the body with subtle fine ribbed texture, and a beige/cream low-waist cargo-style mini skirt with two large front pockets with buttoned flaps. Standing with relaxed posture, hip slightly shifted to the right, left leg slightly forward. Left hand raised holding iPhone with brown/caramel case partially covering lower left cheek, right hand relaxed by right leg. Looking directly at the phone screen reflected in the mirror, mouth closed with subtle smirk. Confident neutral expression. Elevator interior with reflective brushed steel walls, dark elevator control panel slightly visible on the right, white warning sign on the metal wall behind. Overhead fluorescent/LED white light creating strong highlights on chest, face and hard reflections on metal panels. Light bouncing off metal walls filling body shadows. Medium to high contrast emphasizing the tan and skin shine against metallic background. No studio lighting, no ring light, no flash. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Strong specular reflections blown out in metal areas, slight motion blur at edges.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Elevator', 'Tattoos', 'Tan Lines', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 52: IMAGEM - INFLUENCER MARBLE STAIRCASE DRESS
  // ==========================================
  {
    id: 'influencer-marble-staircase-52',
    postNumber: '52',
    title: 'Influencer Marble Staircase Off-the-Shoulder Dress',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img52prompt.webp',
    posterUrl: '/imagensprompt/img52prompt.webp',
    prompt:
      'Ultra-photorealistic 4:5 vertical photo of a 19-year-old Brazilian platinum blonde woman with long loose center-parted waves, posing on a polished marble staircase with integrated warm step lights. She has a voluminous and prominent bust accentuated by a form-fitting white off-the-shoulder mini dress with subtle ruching. Crouched on the steps with knees bent, body angled slightly to the side, holding a small gold handbag. Playful and confident expression, winking with lips slightly puckered, gaze directed toward the camera. Gold high-heeled sandals with thin straps. Jewelry including necklace, bracelet, and rings. Indoor luxury staircase with glass railing and metal handrail. Warm ambient lighting from integrated step lights creating an elegant upscale mood. Gold, cream, and warm beige color palette. Camera slightly above eye level, medium-full shot with natural perspective. Clean polished post-processing with soft skin tones, balanced highlights and shadows, enhanced warmth. Luxury nightlife vibe, warm glamorous confident tone.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '4:5',
    tags: ['Influencer', 'Escadaria Mármore', 'Vestido Branco', 'Salto Dourado', 'Glamour'],
  },

  // ==========================================
  // POST 53: IMAGEM - INFLUENCER RESTAURANT MARGARITA
  // ==========================================
  {
    id: 'influencer-restaurant-margarita-53',
    postNumber: '53',
    title: 'Influencer Restaurant Marble Bar Margarita',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img53prompt.webp',
    posterUrl: '/imagensprompt/img53prompt.webp',
    prompt:
      'Ultra-photorealistic vertical portrait of a stunning 25-year-old Brazilian Latina woman with long wavy platinum blonde silky voluminous hair parted in the middle, sitting at a restaurant marble countertop. She wears a black spaghetti strap tank top, gold layered necklace, and gold bracelet. Right hand holding a rocks glass with a margarita and lime wedge, fingers curled around the glass, left arm resting on the counter. Slight smile looking directly at the camera with blue eyes, defined eyebrows, full lips, natural glam makeup with winged eyeliner and nude lipstick. Background slightly out of focus featuring a beige square tiled wall, stainless steel shelving with stacked white plates, open kitchen with two chefs in white uniforms and hats, hanging copper pendant lights with coiled cords, wooden bar stools. Mixed artificial lighting from overhead recessed lights and hanging pendant lamps creating soft warm diffused light. Soft shadows under chin and on counter. Warm earthy tones with metallic accents, warm beige cream black gold palette with slight golden hue color grading. Eye-level medium shot, shallow depth of field, smartphone camera aesthetic approximately 26mm wide-angle lens f/1.8. Relaxed intimate warm candid lifestyle photography mood.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Restaurante', 'Margarita', 'Balcão de Mármore', 'Lifestyle'],
  },

  // ==========================================
  // POST 54: IMAGEM - INFLUENCER NIGHT WINE GLASS FLASH
  // ==========================================
  {
    id: 'influencer-night-wine-flash-54',
    postNumber: '54',
    title: 'Influencer Outdoor Bar Wine Glass Flash Selfie',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img54prompt.webp',
    posterUrl: '/imagensprompt/img54prompt.webp',
    prompt:
      'Ultra photorealistic 8K UHD iPhone 15 Pro Max selfie style, 9:16 vertical format, 24mm wide angle lens. Young woman with oval face, well-defined jawline, thin slightly upturned nose, full delineated lips with nude gloss, clear green-blue right eye, left eye closed in a charming wink, pronounced highlighter on cheeks and nose tip, natural asymmetry maintained. Long straight blonde hair parted in the middle, fair skin with extremely realistic human texture, deep visible pores, naturally irregular skin texture, small expression marks, micro blemishes and slight unevenness under makeup, natural oiliness and shine on forehead and nose. Multiple piercings on left ear. Seated at an elegant outdoor restaurant or bar at night, dark green bushes and foliage immediately behind, restaurant tables with white tablecloths candles and wine glasses in blurred background, upscale nightlife dining atmosphere. Direct camera flash lighting intensely illuminating face arms and reflecting on wine glass, warm diffuse ambient candlelight from background, high contrast with brightly lit foreground falling quickly into deep darkness behind. Right hand holding white wine glass by the bowl, left hand actively stretched toward camera with fingers nearly touching lens causing strong motion blur and shallow depth of field blur. Wearing a thin-strap lingerie-style dress or top, tight and body-hugging accentuating décolletage, overlaid black lace fabric with metallic golden textured underlayer. Small gold hoop earrings, thin gold bracelets on left wrist including clover pendant Alhambra-style, thin gold rings on both hands, long almond-shaped milky white nails. Playful seductive confident flirty expression with subtle contained smile and relaxed lips with slight natural dryness lines. Visible grainy noise in low light enhancing natural skin imperfections, not extremely sharp more lo-fi feel, blown flash reflection on wine glass edge and body, digital noise in shadowed background foliage areas, slight 24mm barrel distortion stretching edges and exaggerating extended hand size, iOS oversharpening artificial sharpness enhancing micro-textures. Raw unfiltered real iPhone selfie aesthetic posted online with no beauty filters.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Taça de Vinho', 'Flash Noturno', 'iPhone 15 Pro Max', 'Bar Sofisticado'],
  },

  // ==========================================
  // POST 55: IMAGEM - INFLUENCER FESTIVAL VIP BLAZER
  // ==========================================
  {
    id: 'influencer-festival-vip-blazer-55',
    postNumber: '55',
    title: 'Influencer Festival Night VIP Party Blazer',
    category: 'influencer',
    categoryLabel: 'Influencer',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img55prompt.webp',
    posterUrl: '/imagensprompt/img55prompt.webp',
    prompt:
      'Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Young Brazilian woman with oval face, well-defined jawline, straight thin nose, glossy pink lips, white aligned teeth visible in a wide laugh, slightly arched filled eyebrows, pronounced highlighter makeup, almond-shaped eyes. Very long wavy voluminous light brown-auburn highlighted hair. Bronzed skin tone with body shimmer highlighter on chest area, realistic irregular skin texture on face with clearly visible pores under flash light, small natural marks and typical asymmetries of real human skin. Eyes closed squeezed shut from intense laughter looking down, mouth wide open in a big hearty laugh with lips stretched and teeth showing, extreme joy and fun expression. Torso slightly turned to the side, relaxed shoulders in a dancing celebrating movement, standing in the middle of a crowd. Right arm raised holding a transparent plastic cup with draft beer. Wearing a light blue tailored blazer style jacket worn closed with no top underneath, deep V neckline, fitted and structured, matte fabric with dark metallic center button and visible stitching. Thin gold necklace with square pendant containing letter C, multiple colorful VIP festival access wristbands on right wrist. Night party music show or festival setting with blurred people crowd in background, blue and purple stage lights with bokeh effect, dark energetic nightlife atmosphere. Intense direct flash from front and slightly above revealing real skin textures and pores, illuminating face chest and raised cup strongly, blue and purple ambient show lights filling dark background, high contrast between brightly lit subject and dark colorful background. Visible grainy noise in low light, not extremely sharp more lo-fi feel, background colors blown out by stage lights, hair edges slightly blending with background, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness. Energetic festive euphoric nightlife atmosphere.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Festival VIP', 'Blazer Azul', 'Flash Noturno', 'iPhone 15 Pro Max'],
  },

  // ==========================================
  // POST 56: IMAGEM - FOTOS - CINEMA COM PERSONAGENS DE GAME
  // ==========================================
  {
    id: 'fotos-cinema-videogames-56',
    postNumber: '56',
    title: 'Cinema Lotado com Personagens de Games',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img56prompt.webp',
    posterUrl: '/imagensprompt/img56prompt.webp',
    prompt:
      'A hyperrealistic cinematic shot inside a dark movie theater with visible blue seats in the background, filled with various video game characters having fun. The main character, a man (from the provided photo), looks embarrassed, wearing a simple black Nintendo t-shirt, holding a large red and white striped popcorn bucket in one hand. On each side of the main character: Left: Mario Bros. holds a red soda cup in one hand, with a mischievous expression. Right: Donkey Kong is laughing heartily, holding his own popcorn bucket. His smile is wide and sensual, with gleaming teeth. In the background, other video game characters are visible in the seats, including Goku from Dragon Ball, Kratos from God of War, Sonic, Link, Zelda, Princess Peach, a Pikachu-like character, and many more, some wearing 3D glasses, others tossing popcorn in the air, creating a chaotic and festive atmosphere. The lighting is cinematic, primarily coming from an invisible screen in front of them, with light reflections on their faces and popcorn buckets. The details are extremely realistic. Preserve exact facial features, tattoos, and hairstyle from reference. 8K.\n\nNegative: blurry face, distorted proportions, unrealistic lighting, deformed hands, low quality, watermark, text.',
    negativePrompt:
      'blurry face, distorted proportions, unrealistic lighting, deformed hands, low quality, watermark, text',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '16:9',
    tags: ['Fotos', 'Cinema', 'Video Games', 'Nintendo', 'Cinemático 8K'],
  },

  // ==========================================
  // POST 57: IMAGEM - FOTOS - RETRATO PARQUE CAMISA DO BRASIL
  // ==========================================
  {
    id: 'fotos-parque-camisa-brasil-57',
    postNumber: '57',
    title: 'Retrato no Parque Camisa do Brasil',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img57prompt.webp',
    posterUrl: '/imagensprompt/img57prompt.webp',
    prompt:
      "A medium-length portrait with a casual and stylish aesthetic, captured outdoors in a park setting. The male figure stands, leaning casually against a tree trunk, his body slightly turned and his gaze directed to the side through sunglasses. His expression is confident and relaxed. His muscular arms are prominent, with one hand resting on his thigh.\n\nHe wears a Brazilian national soccer team jersey and black pants, which accentuate his physique. He also wears dark sunglasses, a wristwatch with a dark band, and a simple metal bracelet.\n\nThe background is a park or green area with grass, next to a paved path, in bright sunlight. The background is softly blurred (bokeh). The lighting is natural and bright, typical of a sunny day, creating defined highlights and shadows that enhance the physique.\n\nCamera Settings: Captured with a prime portrait lens (e.g., 85mm f/1.8 or 50mm f/1.4) on a full-frame camera for flattering compression and creamy bokeh. Aperture set between f/2.8 and f/4.0 to isolate the subject from the background. ISO 100 for maximum image quality in bright sunlight. Fast shutter speed (e.g., 1/500s to 1/1000s) to compensate for the wide aperture. Natural and direct sunlight.\n\nPlease use the user's reference image to capture and apply all their features, keeping their face, hairstyle, beard, skin tone, and body image accurate and unchanged. The goal is to create a version of the user in this scenario. The clothing (Brazilian national soccer team jersey, black pants, sunglasses, watch), the pose leaning against the tree, the natural lighting, and the park background should be generated as described.",
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '4:5',
    tags: ['Fotos', 'Retrato', 'Camisa do Brasil', 'Parque', 'Bokeh Natural'],
  },

  // ==========================================
  // POST 58: IMAGEM - FOTOS - JET SKI NO OCEANO
  // ==========================================
  {
    id: 'fotos-jet-ski-oceano-58',
    postNumber: '58',
    title: 'Selfie no Jet Ski no Oceano',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img58prompt.webp',
    posterUrl: '/imagensprompt/img58prompt.webp',
    prompt:
      'A realistic and vibrant photo of a young man riding a jet ski in the ocean, taken from a selfie angle showing his head and chest. Use the face from the attached reference image, keeping 100% faithful to the facial features and accessories in that image. The man has dark, natural hair and does not wear sunglasses. He is wearing a black life jacket. The ocean water is slightly rippled, the sun shines brightly under a clear blue sky, and other people on jet skis appear blurred in the distant background, adding a lively and adventurous atmosphere. The image should look photorealistic, sharp, and full of natural lighting and movement.\n\nNegative: blurry face, distorted proportions, unrealistic lighting, deformed hands, wrong facial structure, incorrect accessories, extra people in the foreground, disfigured body, cartoon style, painting, artificial colors, low quality, watermark, text, long hair.',
    negativePrompt:
      'blurry face, distorted proportions, unrealistic lighting, deformed hands, wrong facial structure, incorrect accessories, extra people in the foreground, disfigured body, cartoon style, painting, artificial colors, low quality, watermark, text, long hair',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Fotos', 'Jet Ski', 'Oceano', 'Selfie Ângulo', 'Aventura'],
  },

  // ==========================================
  // POST 59: IMAGEM - FOTOS - RESORT DECK PRAIA BOHO-CHIC
  // ==========================================
  {
    id: 'fotos-resort-deck-praia-59',
    postNumber: '59',
    title: 'Ensaio Boho-Chic Deck Beira-Mar',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img59prompt.webp',
    posterUrl: '/imagensprompt/img59prompt.webp',
    prompt:
      'A medium-length photograph, captured at eye level, with an elegant, vacation-like, and serene aesthetic, set on a floating deck or beachfront restaurant. The female figure is seated on a high bench or stool, with one leg folded over the other and her hands relaxed on her legs. The body is turned slightly to the side, but the head is turned toward the camera, looking with a wide, joyful, and genuine smile. The composition focuses on the figure with the waterscape in the background.\n\nThe female figure displays a curvaceous and toned physique, with a soft, feminine silhouette. Her breasts are medium-sized, slightly visible under the white top and beach cover-up. The waist is defined but not extremely thin, creating a gentle curve. The hips are wide and rounded, transitioning smoothly into the thighs. The legs are thick and toned, especially the thighs, which are prominent and highly defined, highlighted by the pose. The buttocks are medium to large, subtly outlined by the shorts. Her skin has a soft, even tan with a healthy glow.\n\nShe wears an elegant, boho-chic summer outfit, all in white. A long, sheer, lightweight beach cover-up with long, loose sleeves (bell bottoms) and ruffled or tie-front details create a V-neckline. Beneath the cover-up, a white bikini top and tight white shorts are visible. On her feet, she wears discreet flat sandals (possibly thong sandals or thin-strap sandals). Accessories include dark sunglasses with round or oval frames, a thin gold necklace with an "A" or "V" pendant, and multiple rings on her fingers, including a large, eye-catching one. A small straw or wicker bag with brown leather handles and a designer logo (Celine) sits on the counter beside her. Her nails are manicured and painted white or nude.\n\nHer hair is very long, voluminous, and wavy, dark brown or black. It is draped to the left side, falling generously over the shoulder and chest, framing the face. The makeup is visible and well-done, with dark, well-defined eyebrows and lips plumped with vibrant pink lipstick, contrasting with the white look.\n\nThe background is a stunning seaside or lakeside setting. The figure is seated on a brown wooden deck. Behind her, a body of emerald green or turquoise water stretches out, with dense tropical vegetation (trees and dark foliage) on the opposite shore, creating a lush natural setting. The sky, partially visible, is a light blue. The lighting is natural and abundant, likely sunny daylight from the front or slightly to the side. This light enhances the radiance of the skin and the lightness of the white fabric, creating a soft contrast with the water and vegetation. Soft shadows are cast, shaping the figure. The overall atmosphere is one of relaxation, understated luxury, and holiday cheer.\n\nCamera Settings: Captured with a prime portrait lens (e.g., 85mm f/1.8 or 50mm f/1.4) on a full-frame camera for a sharp, medium-length portrait with soft bokeh. Aperture set between f/2.0 and f/2.8 to isolate the subject from the water background and vegetation. ISO 100-200 for abundant natural light. Shutter speed 1/250s to 1/500s. Soft, natural lighting, possibly with a reflector to fill in shadows.\n\nInstructions for the "nano banana":\n\n"Please use the user\'s reference image to capture and apply all of their facial features, face structure, eye color, skin tone (soft tan), hair style and color (very long, thick, wavy, dark brown/black), as well as the described body shape (curvy and toned, bustline)." medium-sized, defined waist, wide hips, thick/toned legs, medium/large butt) with maximum fidelity. The goal is to create a version of the user in this vacation scenario. The clothing (white cover-up, white bikini, white shorts, sunglasses, necklace, rings, straw bag), the sitting pose, the cheerful smile, the natural lighting, and the background of water and tropical vegetation should be generated as described, creating a perfect fusion between the user\'s identity and the aesthetics of the image."',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '4:5',
    tags: ['Fotos', 'Boho-Chic', 'Deck Beira-Mar', 'Celine', 'Retrato Férias'],
  },

  // ==========================================
  // POST 60: IMAGEM - FOTOS - QUARTO CAMA LENÇÓIS BRANCOS
  // ==========================================
  {
    id: 'fotos-quarto-cama-espontanea-60',
    postNumber: '60',
    title: 'Retrato Espontâneo Quarto na Cama',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img60prompt.webp',
    posterUrl: '/imagensprompt/img60prompt.webp',
    prompt:
      'Recrie essa cena usando o meu rosto e corpo como referência da foto enviada. Mantenha a mesma composição, pose e enquadramento da imagem: uma mulher sentada em uma cama com lençóis brancos, com uma perna dobrada e a outra pendendo suavemente, inclinando-se levemente para a frente enquanto passa a mão pelos cabelos, em um gesto natural e confiante.\n\nA expressão deve ser alegre e acolhedora, com um sorriso genuíno e olhar direto para a câmera, transmitindo leveza e espontaneidade.\n\nA roupa deve ser composta por uma blusa de cetim preta com alcinhas finas e decote suave, shorts jeans e sandálias pretas abertas com tiras decoradas por pedrarias coloridas em tom de arco-íris.\n\nComo acessório, um colar prateado delicado.\n\nO cenário deve ser um quarto moderno, com paredes neutras, uma porta ao fundo e uma bolsa de palha com tecido laranja parcialmente visível no chão, mantendo o clima casual e autêntico.\n\nA iluminação deve ser natural e clara, proveniente de uma janela lateral, destacando os tons suaves da pele e o brilho do cabelo.\n\nEstilo de retrato realista e vibrante, atmosfera íntima e descontraída, formato vertical 4:5, qualidade de câmera de smartphone, com profundidade de campo suave e foco no rosto e expressão.',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '4:5',
    tags: ['Fotos', 'Quarto Cama', 'Espontânea', 'Cetim Preto', 'Janela Lateral'],
  },

  // ==========================================
  // POST 61: IMAGEM - FOTOS - ESTILO GTA V LOWRIDER
  // ==========================================
  {
    id: 'fotos-gtav-lowrider-61',
    postNumber: '61',
    title: 'Personagem Estilo GTA V Lowrider Pôr do Sol',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img61prompt.webp',
    posterUrl: '/imagensprompt/img61prompt.webp',
    prompt:
      'A character in the art style of Grand Theft Auto V (GTA V), with a face identical to the one in the photo provided. Preserve the identity, face, and physical characteristics with high similarity. The character is casually leaning against a shiny lowrider with chrome wheels, with one leg crossed over the other. Expression is serious and confident, exuding a gangster attitude. The background features a vibrant urban sunset with palm trees silhouetted against an orange and purple sky. The GTA V logo is subtly visible somewhere in the image. Dramatic and colorful lighting, characteristic of a cinematic game environment. Hyper-detailed, Ultra HD, realistic reflections on the car and urban surfaces, capturing the authentic street style of Los Santos. Style: Video game art (GTA V), stylized illustration, game character realism. Lighting: Urban sunset, dramatic, colorful, neo-noir. Composition: Full-body character, urban background.\n\nNegative: blurry face, distorted proportions, low quality, watermark, wrong facial structure.',
    negativePrompt:
      'blurry face, distorted proportions, low quality, watermark, wrong facial structure',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Fotos', 'GTA V', 'Lowrider', 'Pôr do Sol Los Santos', 'Game Art'],
  },

  // ==========================================
  // POST 62: IMAGEM - FOTOS - EDITORIAL CRISTO REDENTOR
  // ==========================================
  {
    id: 'fotos-editorial-cristo-redentor-62',
    postNumber: '62',
    title: 'Editorial Insano no Alto Cristo Redentor',
    category: 'fotos',
    categoryLabel: 'Fotos',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img62prompt.webp',
    posterUrl: '/imagensprompt/img62prompt.webp',
    prompt:
      'Editorial Theme: "Insano no Alto"\n\nConceito: Um ensaio editorial masculino ambientado nas escadarias do Cristo Redentor, no Rio de Janeiro. O modelo está sentado com postura firme, vestindo camiseta preta com a palavra "INSANE", bermuda azul clara, tênis branco e óculos escuros. O olhar lateral e a composição frontal criam contraste entre atitude urbana e o monumento espiritual ao fundo. A presença de turistas ao redor adiciona contexto e espontaneidade à cena.\n\nEspecificações Técnicas:\nCâmera: Canon EOS R5 ou Nikon Z9\nLente: 50mm f/1.2 — ideal para retratos com profundidade emocional e foco suave\nÂngulo da câmera: frontal, levemente abaixo, com enquadramento vertical (formato 4:5)\nResolução: Ultra HD (8K), capturando detalhes em pele, tecido, escadaria e céu\nIluminação: luz natural intensa, com sombras definidas e reflexos nos óculos e tênis\nEstilo visual: editorial urbano com estética espiritual e contraste cultural\n\nPose: Sentado em Silêncio — modelo sentado com mãos nos joelhos, olhando para o lado — expressão introspectiva e firme\n\nDestaques Visuais:\nMonumento ao Fundo: o Cristo Redentor emoldura a cena com imponência\nEstampa "INSANE": cria contraste entre atitude e espiritualidade\nTextura da Escadaria: adiciona profundidade e contexto urbano\nMood: firme, contemplativo e cultural — ideal para editoriais que misturam moda, identidade e paisagem brasileira',
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '4:5',
    tags: ['Fotos', 'Editorial', 'Cristo Redentor', 'Rio de Janeiro', 'Insane 8K'],
  },

  // ==========================================
  // POST 63: IMAGEM - INFLUENCER NO ROLÊ NOITE - LAMBORGHINI HURACÁN
  // ==========================================
  {
    id: 'influencer-role-noite-lamborghini-63',
    postNumber: '63',
    title: 'Influencer Lamborghini Huracán Noite Urbana',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img63prompt.webp',
    posterUrl: '/imagensprompt/img63prompt.webp',
    prompt: `A young woman with fair skin and very long straight platinum blonde hair, wearing a playful and confident expression, slightly sticking her tongue out while looking back toward the camera. She is posing in front of a red Lamborghini Huracán parked on a city street at night.

The model is positioned slightly to the left side of the car’s front, bending her knees and leaning forward in a dynamic pose, with her body turned sideways and her head turned back toward the camera. One hand rests near her thigh while the other hangs loosely, creating a casual, candid movement feel.

She is wearing a black oversized jacket, loose black pants, and chunky sneakers, giving a relaxed streetwear aesthetic.

The Lamborghini Huracán is clearly visible with its sharp headlights on and low, aggressive front design, occupying the center background of the scene.

The environment is a modern urban city at night, with tall illuminated skyscrapers, streetlights, and an overpass in the background, creating depth and a vibrant city atmosphere.

Lighting combines streetlights and car headlights, producing reflections on the car and pavement, with a slightly warm urban tone.

Aesthetic is urban night lifestyle, luxury streetwear, influencer vibe, candid editorial photography, high detail, sharp focus, wide-angle composition, cinematic night scene.`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Lamborghini', 'Streetwear', 'Urbano'],
  },

  // ==========================================
  // POST 64: IMAGEM - INFLUENCER NO ROLÊ NOITE - BALADA NEON FLASH
  // ==========================================
  {
    id: 'influencer-role-noite-balada-neon-64',
    postNumber: '64',
    title: 'Influencer Balada Neon Flash Drink',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img64prompt.webp',
    posterUrl: '/imagensprompt/img64prompt.webp',
    prompt: `{
  "metadata": {
    "id": "nightlife_female_001",
    "category": "Rolê Noite",
    "tags": ["nightlife", "party", "club", "neon", "fun"],
    "gender": "female",
    "ethnicity": "brazilian",
    "age_range": "20-25",
    "format": "9:16"
  },
  "prompt_structure": {
    "quality_modifiers": "((ultra realistic)), 8k uhd, photorealistic, professional nightlife photography, sharp focus, highly detailed",
    "subject": {
      "main_description": "young Brazilian female nightlife influencer",
      "age": "22 years old",
      "facial_features": "youthful face, expressive eyes, playful features, natural beauty",
      "expression": "energetic party expression, open mouth smile, playful and wild",
      "skin": "natural skin texture, slight glow from club lighting",
      "makeup": "party makeup, glossy lips, subtle shimmer, bold youthful style"
    },
    "hair": {
      "style": "long straight hair",
      "color": "dark brown",
      "texture": "natural movement, slightly messy from dancing"
    },
    "clothing": {
      "description": "black fitted crop top and black mini skirt",
      "style": "nightlife party outfit",
      "accessories": "neon futuristic sunglasses, small shoulder bag, wristband"
    },
    "hands_nails": {
      "description": "((well-manicured hands with five fingers, natural hand anatomy)):1.3",
      "nails": "colorful manicure, glossy finish",
      "pose": "one hand making playful gesture, other holding drink glass naturally"
    },
    "product": {
      "type": "drink glass",
      "description": "((transparent glass with dark beverage)):1.2, ice cubes visible",
      "positioning": "held in right hand at chest level, angled slightly toward camera"
    },
    "pose_composition": {
      "body_position": "standing and leaning slightly forward, dynamic party stance",
      "eye_direction": "looking directly at camera through sunglasses",
      "overall_pose": "playful energetic nightclub pose, expressive and candid"
    },
    "camera_settings": {
      "shot_type": "medium full body",
      "aperture": "f/2.0",
      "depth_of_field": "shallow with heavy club bokeh",
      "format": "vertical 9:16"
    },
    "lighting": {
      "primary": "club lighting with neon accents",
      "quality": "mixed low light with bright flash, high contrast",
      "direction": "direct flash from camera with ambient neon lights",
      "temperature": "mixed cool and warm tones"
    },
    "background": {
      "setting": "crowded nightclub dance floor",
      "description": "blurred crowd dancing, neon lights, laser effects, dark environment with colorful highlights",
      "atmosphere": "high energy party, loud music vibe, nightlife chaos"
    },
    "color_grading": {
      "palette": "neon colors, blues, purples, greens",
      "mood": "wild, energetic, fun",
      "saturation": "slightly high for nightlife aesthetic"
    },
    "style_aesthetic": {
      "photography_style": "authentic nightlife snapshot, flash photography",
      "mood": "spontaneous, chaotic, fun",
      "authenticity": "real party moment, not staged, candid energy"
    }
  },
  "final_prompt": "((ultra realistic)), 8k uhd, photorealistic, professional nightlife photography, sharp focus, highly detailed, young Brazilian female nightlife influencer, 22 years old, youthful expressive face, playful features, energetic open mouth smile, wild party expression, natural skin texture with club lighting glow, party makeup with glossy lips and shimmer, long straight dark brown hair slightly messy, black fitted crop top and black mini skirt, nightlife outfit, neon futuristic sunglasses, small shoulder bag, wristband, ((well-manicured hands with five fingers, natural hand anatomy)):1.3, colorful glossy nails, one hand making playful gesture, other holding ((transparent glass with dark beverage)):1.2 with ice cubes, held at chest level angled toward camera, standing leaning forward in dynamic party stance, looking directly at camera through sunglasses, expressive candid nightclub pose, medium full body shot, vertical 9:16, f/2.0 aperture, shallow depth of field, heavy club bokeh, direct flash lighting with neon ambient lights, high contrast, mixed cool and warm tones, crowded nightclub dance floor background, blurred dancing crowd, neon lights and lasers, dark environment with colorful highlights, high energy party atmosphere, neon color palette with blues purples greens, wild energetic mood, slightly high saturation, authentic nightlife snapshot style, spontaneous chaotic fun, real party moment",
  "negative_prompt_compiled": "deformed hands, extra fingers, missing fingers, bad anatomy, blurry face, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, clean studio background, empty club, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces",
  "api_parameters": {
    "width": 512,
    "height": 912,
    "steps": 45,
    "cfg_scale": 7.5,
    "sampler": "DPM++ 2M Karras",
    "seed": -1
  }
}`,
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, blurry face, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, clean studio background, empty club, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces',
    recommendedModel: 'SDXL / Flux.1 Dev / Midjourney',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Nightlife', 'Balada', 'Neon Flash'],
  },

  // ==========================================
  // POST 65: IMAGEM - INFLUENCER NO ROLÊ NOITE - VIP CLUB PAPARAZZI
  // ==========================================
  {
    id: 'influencer-role-noite-vip-club-65',
    postNumber: '65',
    title: 'Influencers VIP Club Paparazzi Flash',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img65prompt.webp',
    posterUrl: '/imagensprompt/img65prompt.webp',
    prompt: `{
  "metadata": {
    "id": "nightlife_female_002",
    "category": "Rolê Noite",
    "tags": ["nightlife", "party", "club", "friends", "luxury"],
    "gender": "female",
    "ethnicity": "european",
    "age_range": "22-28",
    "format": "9:16"
  },
  "prompt_structure": {
    "quality_modifiers": "((ultra realistic)), 8k uhd, photorealistic, professional nightlife photography, sharp focus, highly detailed",
    "subject": {
      "main_description": "two stylish European female nightlife influencers posing together",
      "age": "24 years old",
      "facial_features": "glamorous features, defined cheekbones, full lips, symmetrical faces",
      "expression": "playful and confident expressions, smiling and teasing, high energy",
      "skin": "smooth natural skin texture with subtle glow from flash lighting",
      "makeup": "glam party makeup, glossy lips, defined contour, highlighted cheekbones"
    },
    "hair": {
      "style": "long straight and wavy mix",
      "color": "one blonde hair, one dark brown hair",
      "texture": "sleek shiny hair, slightly tousled from dancing"
    },
    "clothing": {
      "description": "tight black mini dresses, elegant nightlife outfits",
      "style": "luxury clubwear",
      "accessories": "small designer-style shoulder bag, sunglasses at night, luxury watch"
    },
    "hands_nails": {
      "description": "((well-manicured hands with five fingers each, natural anatomy)):1.3",
      "nails": "long acrylic nails, glossy nude and pink tones",
      "pose": "playful hand gestures, one pointing upward, one touching lips"
    },
    "product": {
      "type": "fashion accessories",
      "description": "((luxury style handbag and wristwatch)):1.2, visible details",
      "positioning": "bag resting on hip, watch visible on wrist"
    },
    "pose_composition": {
      "body_position": "standing close together, leaning into each other, dynamic party pose",
      "eye_direction": "looking toward camera through sunglasses",
      "overall_pose": "confident, playful, energetic nightlife pose"
    },
    "camera_settings": {
      "shot_type": "medium shot",
      "aperture": "f/2.0",
      "depth_of_field": "shallow depth with dark blurred background",
      "format": "vertical 9:16"
    },
    "lighting": {
      "primary": "direct flash photography",
      "quality": "high contrast, sharp highlights, nightlife flash aesthetic",
      "direction": "front-facing flash with dark ambient background",
      "temperature": "neutral with slight warm tones"
    },
    "background": {
      "setting": "dark nightclub interior",
      "description": "minimal visible background, deep shadows, subtle hints of club environment",
      "atmosphere": "exclusive VIP nightlife vibe"
    },
    "color_grading": {
      "palette": "dark tones with bright skin highlights",
      "mood": "luxury, wild, energetic",
      "saturation": "balanced with strong contrast"
    },
    "style_aesthetic": {
      "photography_style": "flash nightlife photography, paparazzi style",
      "mood": "fun, rebellious, high energy",
      "authenticity": "candid party moment, not staged"
    }
  },
  "final_prompt": "((ultra realistic)), 8k uhd, photorealistic, professional nightlife photography, sharp focus, highly detailed, two stylish European female nightlife influencers, 24 years old, glamorous features, defined cheekbones, full lips, playful confident expressions, smiling and teasing, high energy party mood, smooth natural skin texture with flash glow, glam makeup with glossy lips and contour, long sleek hair, one blonde one dark brown, shiny slightly tousled texture, tight black mini dresses, luxury clubwear outfits, sunglasses at night, small shoulder bag, luxury watch, ((well-manicured hands with five fingers each, natural anatomy)):1.3, long acrylic glossy nails, playful hand gestures, one pointing upward one touching lips, ((luxury style handbag and wristwatch)):1.2 visible, standing close together leaning into each other, dynamic party pose, looking toward camera through sunglasses, confident energetic nightlife stance, medium shot, vertical 9:16, f/2.0 aperture, shallow depth of field, dark blurred background, direct flash lighting, high contrast highlights, nightlife flash aesthetic, front-facing flash with dark ambient club background, neutral warm tones, dark nightclub interior, minimal background detail, deep shadows, exclusive VIP vibe, dark color palette with bright highlights, luxury wild energetic mood, flash paparazzi style photography, candid authentic party moment",
  "negative_prompt_compiled": "deformed hands, extra fingers, missing fingers, bad anatomy, blurry faces, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, empty background, dead eyes, floating objects, 3D render, unnatural skin tones, wig-like hair, distorted faces",
  "api_parameters": {
    "width": 512,
    "height": 912,
    "steps": 45,
    "cfg_scale": 7.5,
    "sampler": "DPM++ 2M Karras",
    "seed": -1
  }
}`,
    negativePrompt:
      'deformed hands, extra fingers, missing fingers, bad anatomy, blurry faces, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, empty background, dead eyes, floating objects, 3D render, unnatural skin tones, wig-like hair, distorted faces',
    recommendedModel: 'SDXL / Flux.1 Dev / Midjourney',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'VIP Club', 'Paparazzi Flash', 'Luxury Nightlife'],
  },

  // ==========================================
  // POST 66: IMAGEM - INFLUENCER NO ROLÊ NOITE - LOUNGE SOFÁ VINHO
  // ==========================================
  {
    id: 'influencer-role-noite-lounge-sofa-66',
    postNumber: '66',
    title: 'Influencer Lounge Bar Top Vinho iPhone Realism',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img66prompt.webp',
    posterUrl: '/imagensprompt/img66prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["rosto oval com traços típicos de uma mulher brasileira, pele bronzeada, maxilar marcado e definido, nariz reto e fino, lábios cheios com acabamento glossy nude/rosado, olhos grandes amendoados de cor verde/mel, sobrancelhas arqueadas e definidas, maquiagem marcante com cílios longos, assimetria natural mantida"],"regras_de_aparencia":["cabelo castanho escuro, longo, ondulado, volumoso e com aspecto levemente bagunçado, tom de pele bronzeado uniforme, textura de pele realista com poros dilatados visíveis, textura levemente irregular, pequenas linhas de expressão e marcas naturais no rosto"]},"cena":{"local":"casa noturna, bar ou lounge","ambiente":["pessoas em pé conversando e dançando desfocadas ao fundo","teto e paredes com iluminação neon em tubos retos nas cores azul, rosa, verde e amarelo","ambiente escuro e movimentado típico de balada, com sofás de estofado escuro"],"atmosfera":"vibrante, noturna, jovem, festiva e glamorosa"},"iluminacao":{"tipo":"luz artificial mista","luz_principal":"luz frontal forte e direta, possivelmente do flash do celular ou iluminação direcional iluminando o rosto e tronco de forma uniforme","luz_de_preenchimento":"luzes neon coloridas ao fundo e luz ambiente fraca da casa noturna","contraste":"alto contraste entre o sujeito bem iluminado em primeiro plano e o fundo escuro","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"foto tirada por outra pessoa (terceira pessoa)","angulo":"frontal, na altura dos olhos, levemente inclinado de cima para baixo","distancia":"plano médio (enquadramento da metade das coxas para cima)","visibilidade_do_celular":"o celular não aparece na imagem"},"assunto":{"genero":"feminino","idade":"adulto (21+)","vibe":"mulher brasileira, glamorosa, noturna, confiante, atraente","textura_pele":"pele com maquiagem de cobertura suave que não esconde a textura humana real, revelando textura irregular, poros visíveis na região T e bochechas, leve oleosidade/brilho natural na ponta do nariz, além de pequenas marcas, pintas e micro imperfeições naturais da pele","expressao":{"olhos":"olhando fixa e diretamente para a lente da câmera","boca":"fechada, levemente projetada com expressão neutra (pout)","emocao":"neutra, confiante, sedutora"},"pose":{"posicao":"sentada com as pernas levemente cruzadas/inclinadas para o lado","apoio":"sofá ou banco de couro sintético preto","mao":"mão direita segurando um copo de vidro baixo com bebida colorida (amarelo, verde, vermelho) e canudo preto; mão esquerda repousando relaxada com os dedos estendidos sobre o assento do sofá"},"roupa":{"blusa":{"tipo":"top tomara-que-caia","caimento":"justo e colado ao corpo","detalhes":"tecido liso que imita couro (PU) na cor bordô/vinho com leve brilho"},"extra":["shorts curtos de cintura alta do mesmo tecido e cor (bordô/vinho) com botão frontal","colar fino de corrente dourada","brincos de argola média dourados","unhas feitas com esmalte claro/francesinha"]}},"qualidade_da_imagem":{"foco":"foco cravado no rosto e na roupa do sujeito, fundo intencionalmente desfocado (bokeh natural)","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"ruído granulado leve visível nas áreas escuras do fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'iPhone 15 Pro Max', 'Lounge Sofá', 'Top Vinho'],
  },

  // ==========================================
  // POST 67: IMAGEM - INFLUENCER NO ROLÊ NOITE - CORVETTE C8 MIAMI
  // ==========================================
  {
    id: 'influencer-role-noite-corvette-67',
    postNumber: '67',
    title: 'Influencer Corvette C8 Miami Skyline Night',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img67prompt.webp',
    posterUrl: '/imagensprompt/img67prompt.webp',
    prompt: `A young woman with light-to-medium skin tone and long straight dark brown hair, wearing a confident and relaxed expression, looking slightly off to the side. She is posing in front of a light blue Chevrolet Corvette C8 convertible parked in an open parking area at night.

The model is positioned sitting on the front edge of the car (hood area), slightly to one side, with one leg bent and the other extended downward. One hand rests casually on the car’s surface for support, while the other rests on her thigh, creating a composed and stylish pose.

She is wearing a strapless fitted top in olive green, black shorts, white sneakers, and dark sunglasses, giving a modern, confident influencer look.

The Corvette C8 is clearly visible with its sharp angular headlights, low aerodynamic design, and convertible roof, dominating the foreground.

The background features a vibrant city skyline at night, with tall illuminated buildings, neon accents in red and blue, and palm trees, creating a tropical urban luxury atmosphere.

Lighting is a combination of direct flash and ambient city lights, creating strong highlights on the model and car while maintaining detailed background visibility.

Aesthetic is luxury lifestyle, night city influencer vibe, Miami-style urban scene, editorial photography, high detail, sharp focus, wide-angle composition, cinematic night lighting.`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Corvette C8', 'Miami Skyline', 'Luxury Lifestyle'],
  },

  // ==========================================
  // POST 68: IMAGEM - INFLUENCER NO ROLÊ NOITE - MERCEDES AMG
  // ==========================================
  {
    id: 'influencer-role-noite-mercedes-68',
    postNumber: '68',
    title: 'Influencer Mercedes-Benz AMG Parking Night',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img68prompt.webp',
    posterUrl: '/imagensprompt/img68prompt.webp',
    prompt: `A young woman with tan skin and long straight dark hair, with a relaxed and introspective expression, looking down. She is standing in front of a matte gray Mercedes-Benz AMG (GT series) parked in an empty parking lot at night.

The model is centered in front of the car, leaning slightly forward with a casual posture. Her head is tilted downward, and her arms are relaxed near her sides, giving a natural candid feel.

She is wearing a white fitted cropped tank top and loose light blue high-waisted jeans, creating a simple and casual streetwear look.

The Mercedes AMG is clearly visible with its distinct front grille and headlights, occupying the background behind her.

The environment is a dimly lit parking lot with streetlights and a city building in the distance, adding depth to the scene.

Lighting is strong and direct, with a flash photography effect, creating contrast, deep shadows, and highlights on the skin. Street photography, urban lifestyle, influencer aesthetic, high detail, sharp focus, night atmosphere.`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Mercedes AMG', 'Streetwear', 'Flash Photography'],
  },

  // ==========================================
  // POST 69: IMAGEM - INFLUENCER NO ROLÊ NOITE - JANTAR ELEGANTE VINHO
  // ==========================================
  {
    id: 'influencer-role-noite-jantar-vinho-69',
    postNumber: '69',
    title: 'Influencer Jantar Luxuoso Taça Vinho Branco',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img69prompt.webp',
    posterUrl: '/imagensprompt/img69prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["mulher jovem, rosto oval, maxilar bem definido, nariz fino e levemente arrebitado, lábios cheios e delineados com gloss nude, olho direito claro (verde/azulado), olho esquerdo piscando, maquiagem com iluminador pronunciado nas bochechas e ponta do nariz, assimetria natural mantida"],"regras_de_aparencia":{"descricao_base":"cabelo loiro longo, liso e repartido ao meio, pele clara com textura humana extremamente realista, poros profundos e visíveis a olho nu, textura irregular natural da pele, pequenas marcas de expressão, micro manchas e leves desníveis sob a maquiagem, oleosidade/brilho natural na testa e nariz","modificacoes_corporais":"múltiplos furos e piercings na orelha esquerda"}},"cena":{"local":"restaurante ou bar elegante ao ar livre durante a noite","ambiente":["arbustos e folhagens verdes escuras imediatamente atrás","mesas de restaurante com toalhas brancas, taças e luz de velas ao fundo","ambiente noturno movimentado, elegante, com fundo ligeiramente desfocado"],"atmosfera":"vibe de jantar luxuoso, descontraída, 'night out' estético"},"iluminacao":{"tipo":"flash direto de câmera de celular","luz_principal":"flash frontal e forte, iluminando intensamente o rosto, braços e refletindo no vidro da taça, evidenciando as imperfeições e a textura da pele","luz_de_preenchimento":"iluminação ambiente quente, difusa e amarelada vinda das velas e luzes do restaurante ao fundo","contraste":"alto contraste, com primeiro plano super iluminado e fundo caindo rapidamente para a escuridão profunda","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado","pele de porcelana perfeita","filtros de suavização"]},"perspectiva_da_camera":{"pov":"foto tirada por alguém sentado à mesma mesa, na frente da modelo","angulo":"frontal, ligeiramente no nível dos olhos","distancia":"plano médio/fechado, cortando logo abaixo do busto, com a mão esquerda invadindo a lente","visibilidade_do_celular":"o celular não aparece"},"assunto":{"genero":"feminino","idade":"20 anos","vibe":"influenciadora de moda/luxo, estética 'old money', confiante e glamourosa, beleza crua e não filtrada","textura_pele":"poros altamente detalhados e dilatados nas bochechas, zona T e queixo, textura de pele irregular com pequenas marcas naturais, micro cravos no nariz, leves variações de pigmentação, brilho de iluminador realista mesclado com a oleosidade natural da pele humana","expressao":{"olhos":"olhando diretamente para a lente, olho esquerdo fechado em uma piscadela charmosa","boca":"sorriso contido e sutil, lábios relaxados mas desenhados com leves linhas de ressecamento natural","emocao":"sedução brincalhona, confiança, alegria, flerte"},"pose":{"posicao":"sentada, com o corpo levemente inclinado para frente em direção à câmera","apoio":"cadeira de restaurante (parcialmente visível)","mao":"mão direita segurando taça de vinho branco pelo bojo, mão esquerda esticada ativamente em direção à câmera, com os dedos quase tocando a lente"},"roupa":{"blusa":{"tipo":"vestido ou blusa de alças bem finas estilo lingerie","caimento":"justo no corpo, valorizando o colo","detalhes":"tecido sobreposto com renda preta e fundo metálico/dourado texturizado por baixo"},"extra":["brincos de argola dourados pequenos","pulseiras douradas finas no pulso esquerdo, incluindo uma com pingente de trevo (estilo Alhambra)","anéis dourados finos em ambas as mãos","unhas longas amendoadas com esmalte claro tipo 'milky white'","bolsa preta pequena presa debaixo do braço esquerdo"]}},"qualidade_da_imagem":{"foco":"foco cravado no rosto da modelo detalhando a textura cutânea; a mão estendida em primeiro plano sofre forte desfoque de movimento/profundidade de campo rasa, assim como o fundo","granulacao":"ruído visível em baixa luminosidade, realçando as imperfeições naturais da pele","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real e crua de iPhone postada online sem nenhum filtro de beleza","artefatos_de_sensor":"reflexo estourado do flash na borda e corpo da taça de vinho, ruído digital nas áreas sombreadas das folhas ao fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas e exagerando o tamanho da mão esticada","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS realçando micro-texturas"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado, pele de porcelana perfeita, filtros de suavização',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Restaurante Luxo', 'Taça Vinho', 'Old Money'],
  },

  // ==========================================
  // POST 70: IMAGEM - INFLUENCER NO ROLÊ NOITE - ROOFTOP Y2K
  // ==========================================
  {
    id: 'influencer-role-noite-rooftop-y2k-70',
    postNumber: '70',
    title: 'Influencer Rooftop Parking Y2K Louis Vuitton',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img70prompt.webp',
    posterUrl: '/imagensprompt/img70prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Rosto de formato oval, maxilar bem definido, nariz fino com sardas evidentes, poros visíveis na zona T, textura de pele levemente irregular com pequenas marcas e imperfeições naturais, lábios carnudos com bastante gloss rosa, usando óculos de sol grandes sem aro com lentes rosa degradê. Assimetria natural mantida, sem alteração facial, sem erros de troca de rosto, sem rosto genérico de IA"],"regras_de_aparencia":["Cabelo loiro com raiz esfumada, preso em um coque despojado com mechas frontais soltas emoldurando o rosto. Tom de pele bronzeado. Textura de pele ultra realista com poros aparentes, textura irregular, pequenas manchas e marcas naturais de pele humana, sardas nítidas na região do nariz e bochechas, leve brilho natural","Tatuagem com o número '1992' no antebraço e tatuagem de caligrafia fina perto do pulso"]},"cena":{"local":"Estacionamento aberto no terraço durante a noite","ambiente":["Chão de concreto com marcações amarelas de vaga","Prédios da cidade iluminados ao fundo com efeito bokeh","Ambiente urbano noturno, vazio"],"atmosfera":"Urbana, noturna, glamourosa, estética 'night out'"},"iluminacao":{"tipo":"Flash direto misturado com luz artificial ambiente","luz_principal":"Luz de flash forte e frontal iluminando o rosto e o corpo, destacando a textura real da pele e gerando alto contraste com o fundo escuro","luz_de_preenchimento":"Luzes distantes da cidade e iluminação amarelada fraca do estacionamento no fundo","contraste":"Alto contraste dramático entre o primeiro plano iluminado pelo flash e o fundo noturno escuro","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado","pele de porcelana","pele perfeitamente lisa"]},"perspectiva_da_camera":{"pov":"Selfie tirada de perto por outra pessoa ou com braço estendido","angulo":"Ângulo nivelado com o rosto, pessoa virada de lado olhando por cima do ombro","distancia":"Plano médio-curto (do peito para cima)","visibilidade_do_celular":"Celular não visível na imagem"},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"It-girl, estética Y2K, confiante, glamourosa","textura_pele":"Sardas nítidas no nariz e maçãs do rosto, poros bem aparentes, textura da pele irregular com pequenas marcas naturais e micro imperfeições reais, oleosidade natural da pele refletindo o flash","expressao":{"olhos":"Escondidos por óculos de sol, direcionados para a câmera","boca":"Lábios fazendo bico, levemente pressionados pelo dedo indicador","emocao":"Brincalhona, posando, autoconfiante"},"pose":{"posicao":"Corpo de lado, ombro projetado para a frente, cabeça virada olhando para trás","apoio":"Em pé no piso de concreto","mao":"Mão direita erguida com o dedo indicador tocando os lábios, exibindo anéis e pulseiras; o braço também segura a alça de uma bolsa"},"roupa":{"blusa":{"tipo":"Regata de alça grossa","caimento":"Justa ao corpo","detalhes":"Tecido canelado na cor rosa muito claro"},"extra":["Óculos de sol modelo aviador sem aro com lentes rosa degradê","Colar de corrente dourada grossa","Pulseira de elos brancos","Duas pulseiras grossas de resina (uma transparente e uma branca)","Múltiplos anéis dourados nos dedos","Bolsa modelo tote com estampa monograma Louis Vuitton clássica"]}},"qualidade_da_imagem":{"foco":"Foco cravado no rosto revelando a textura da pele e poros, e na mão em primeiro plano, fundo com forte desfoque (bokeh nas luzes)","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online, sem nenhum filtro de beleza","artefatos_de_sensor":"Leve ruído cromático nas áreas mais escuras do céu e do estacionamento ao fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS realçando poros"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado, pele de porcelana, pele perfeitamente lisa',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Rooftop Parking', 'Y2K It-Girl', 'Louis Vuitton'],
  },

  // ==========================================
  // POST 71: IMAGEM - INFLUENCER NO ROLÊ NOITE - BALADA TAÇA GIN
  // ==========================================
  {
    id: 'influencer-role-noite-taca-gin-71',
    postNumber: '71',
    title: 'Influencer Balada Taça Gin Piscando',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img71prompt.webp',
    posterUrl: '/imagensprompt/img71prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Jovem mulher brasileira com rosto oval, maxilar bem definido, nariz reto, lábios carnudos naturais com gloss transparente, pele clara, sobrancelhas arqueadas e naturais, assimetria natural mantida, sem alteração facial, sem erros de troca de rosto, sem rosto genérico de IA"],"regras_de_aparencia":{"cabelo_e_pele":"cabelo loiro liso, comprimento médio, dividido ao meio com mechas frontais levemente bagunçadas sobre o rosto; tom de pele claro, textura de pele extremamente realista e irregular, com poros dilatados visíveis na zona T e bochechas, pequenas sardas, sinais e pequenas marcas naturais no rosto, leve oleosidade/brilho no nariz e testa devido ao flash","tatuagens_e_marcas":"pequena tatuagem escura de um símbolo na parte interna do antebraço direito"}},"cena":{"local":"festa noturna, balada ou evento escuro","ambiente":["fundo muito escuro","pessoas borradas e silhuetas escuras ao fundo","estado do ambiente agitado e lotado"],"atmosfera":"vibe de festa, energia caótica, diversão noturna candid"},"iluminacao":{"tipo":"flash direto de celular","luz_principal":"flash duro e frontal vindo diretamente da direção da câmera, iluminando fortemente o rosto e o peito","luz_de_preenchimento":"sombras duras projetadas logo atrás da modelo, fundo subexposto","contraste":"contraste muito alto entre a modelo superiluminada e o fundo escuro","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"foto tirada por um amigo muito próximo ou selfie com braço completamente fora de quadro","angulo":"frontal, levemente de cima para baixo (câmera um pouco acima da linha dos olhos)","distancia":"corte do peito para cima (close-up médio)","visibilidade_do_celular":"não visível"},"assunto":{"genero":"feminino","idade":"20 anos","vibe":"party girl, descontraída, confiante","textura_pele":"textura irregular humana autêntica, poros proeminentes sob luz dura, micro marcas e pintas naturais, brilho de suor real e oleosidade na zona T, micro linhas de expressão ao redor do olho que está piscando","expressao":{"olhos":"olho direito levemente semicerrado pela luz, olho esquerdo piscando forte","boca":"boca aberta em sorriso com a língua esticada para fora","emocao":"euforia, brincadeira, rebeldia"},"pose":{"posicao":"em pé, ombros levemente levantados em tom de brincadeira","apoio":"não visível","mao":"mão direita erguida acima do ombro segurando a haste e a base do bojo de uma grande taça de gin/coquetel cheia de gelo e limão/hortelã; unhas compridas amendoadas pintadas de branco"},"roupa":{"blusa":{"tipo":"top estilo frente única (halter top) com amarração fina no pescoço","caimento":"justo no busto","detalhes":"tecido brilhante em tom de bronze/dourado escuro com textura de paetês ou malha de metal refletindo pontualmente a luz do flash"},"extra":["colar fino de ouro com um pingente numérico ('422')","vários braceletes largos e rígidos em tons de ouro e preto no pulso direito","anéis finos nos dedos indicador e anelar da mão direita"]}},"qualidade_da_imagem":{"foco":"foco principal cravado no rosto e na taça em primeiro plano, fundo completamente fora de foco","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"pequenos pontos estourados de luz no vidro da taça e nas lantejoulas da roupa","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Taça Gin', 'Balada Party Girl', 'Flash Direto'],
  },

  // ==========================================
  // POST 72: IMAGEM - INFLUENCER NO ROLÊ NOITE - ESPRESSO MARTINI
  // ==========================================
  {
    id: 'influencer-role-noite-espresso-martini-72',
    postNumber: '72',
    title: 'Influencer Espresso Martini & Dry Martini Lounge',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img72prompt.webp',
    posterUrl: '/imagensprompt/img72prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Mulher jovem de 20 anos, formato de rosto oval, maxilar bem definido e estrutura óssea marcada, nariz fino e reto, lábios cheios e naturais levemente projetados com gloss ou batom nude rosado, olhos azuis claros grandes e amendoados, cílios longos escuros, maquiagem iluminada, sobrancelhas castanhas levemente arqueadas, assimetria natural mantida, com pequenas marcas naturais espalhadas pelo rosto"],"regras_de_aparencia":{"detalhes":"Cabelo longo castanho claro com mechas loiras (highlights frontais), liso e repartido ao meio. Tom de pele claro. Textura de pele extremamente realista e irregular, com poros bem aparentes nas bochechas e nariz, pequenas manchas e desníveis reais de pele humana, brilho e oleosidade natural na zona T refletindo o flash duro"}},"cena":{"local":"Ambiente interno noturno, bar, lounge ou evento social escuro","ambiente":["Fileira de sacolas ou caixas de presente escuras com laços brancos desfocadas ao fundo","Paredes ou cortinas em tons quentes e escuros","Ambiente noturno, festivo, com profundidade de campo rasa (fundo desfocado)"],"atmosfera":"Festa, 'night out', descontraída, glamourosa, estética flash de balada"},"iluminacao":{"tipo":"Luz mista (flash direto + luz ambiente baixa)","luz_principal":"Flash frontal direto (típico de celular), criando reflexos fortes no rosto, nos olhos e nas taças","luz_de_preenchimento":"Luz ambiente muito fraca, escura e quente ao fundo","contraste":"Alto contraste entre o primeiro plano estourado pelo flash e o fundo escuro","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"POV de uma segunda pessoa (quem tira a foto possivelmente segura o drink de café), olhando de cima para baixo","angulo":"High angle (plongeé leve), de cima para baixo","distancia":"Close-up médio, enquadrando o tronco superior, rosto e as mãos com os drinks","visibilidade_do_celular":"O celular não aparece, a foto é tirada por quem está interagindo com a modelo"},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"Festeira, 'Gen Z going out', elegante, noturna","textura_pele":"Altamente realista, textura irregular de pele humana, poros evidentes e dilatados ao redor do nariz e maçãs do rosto, pequenas marcas naturais, micro manchas, oleosidade realística na testa e nariz refletindo o flash de forma imperfeita","expressao":{"olhos":"Olhando fixamente e de baixo para cima diretamente para a lente da câmera","boca":"Lábios projetados e encostados na borda da taça, prestes a beber","emocao":"Confiante, sedutora, focada e divertida"},"pose":{"posicao":"Tronco levemente inclinado para a frente em direção à câmera","apoio":"Em pé, inclinando-se","mao":"A mão esquerda da modelo segura uma taça de dry martini com azeitona. A mão de outra pessoa em primeiro plano segura uma taça de espresso martini encostada na boca da modelo"},"roupa":{"blusa":{"tipo":"Top ou corset preto decotado com uma camisa ou jaqueta preta por cima","caimento":"Ajustado no tronco, com a peça sobreposta caindo solta pelos ombros e braços","detalhes":"Tecido liso escuro, estilo noturno elegante, alças finas visíveis"},"extra":["Anéis dourados finos nos dedos da mão que segura o dry martini","Taça de dry martini clássico com palito e azeitona","Taça coupé com espresso martini e três grãos de café na espuma"]}},"qualidade_da_imagem":{"foco":"Foco cravado nos olhos da modelo e na taça de espresso martini em primeiro plano, fundo com desfoque suave","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Leve ruído cromático nas áreas de sombra ao fundo, reflexos duros do flash","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Espresso Martini', 'Dry Martini', 'Lounge Bar'],
  },

  // ==========================================
  // POST 73: IMAGEM - INFLUENCER NO ROLÊ NOITE - ABSOLUT VODKA BRASIL
  // ==========================================
  {
    id: 'influencer-role-noite-absolut-vodka-73',
    postNumber: '73',
    title: 'Influencer Absolut Vodka Ray-Ban Brasil',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img73prompt.webp',
    posterUrl: '/imagensprompt/img73prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Jovem mulher brasileira com rosto oval, maxilar bem definido, nariz reto, lábios carnudos sem batom aparente (naturais e umedecidos), dentes visíveis num sorriso largo. Olhos ocultos por óculos escuros pretos, modelo clássico Ray-Ban."],"regras_de_aparencia":{"aparencia_geral":"Cabelo longo, moreno com ondas naturais e pontas tingidas de rosa, jogado para trás. Pele clara com textura crua e hiper-realista: poros aparentes na região do nariz e bochechas, pequenas marcas naturais de pele, leves irregularidades e micro imperfeições reveladas sob o flash forte. Brilho natural de oleosidade e suor na testa. Lentes dos óculos Ray-Ban com texto: lente esquerda com 'FUCK' em letras brancas/douradas pequenas, e lente direita com 'off' em letras pequenas na borda inferior."}},"cena":{"local":"Ambiente externo à noite, possivelmente uma festa ou bar.","ambiente":["Cadeira de vime ou rattan escuro texturizado à esquerda","Fundo escuro noturno com pouca visibilidade","Descontraído e informal"],"atmosfera":"Festa, diversão noturna, espontânea e agitada."},"iluminacao":{"tipo":"Flash direto","luz_principal":"Flash forte e frontal da câmera, criando iluminação estourada no primeiro plano e sombras duras.","luz_de_preenchimento":"Inexistente, o fundo cai na escuridão profunda.","contraste":"Alto contraste entre os sujeitos iluminados e o fundo escuro.","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"Foto tirada por terceiros (não é selfie).","angulo":"Levemente de cima para baixo, focando no rosto inclinado da mulher.","distancia":"Plano médio-curto, enquadrando do torso para cima.","visibilidade_do_celular":"O celular não aparece na imagem."},"assunto":{"genero":"Feminino","idade":"jovem (20 anos)","vibe":"Festeira brasileira autêntica, 'night out', jovem e descontraída.","textura_pele":"Textura irregular hiper-realista sob flash agressivo, poros dilatados visíveis na zona T, micro marcas de expressão em volta do sorriso aberto, textura natural e não plastificada de pele humana viva com leve brilho.","expressao":{"olhos":"Ocultos pelos óculos de sol, mas a expressão sugere que estão fechados ou semicerrados por causa do riso.","boca":"Bem aberta, rindo muito, recebendo o fluxo de líquido que cai da garrafa.","emocao":"Alegria, euforia, diversão intensa."},"pose":{"posicao":"Cabeça inclinada totalmente para trás, pescoço esticado, ombros relaxados.","apoio":"Aparentemente sentada ou encostada em uma cadeira.","mao":"Mãos da mulher não visíveis na ação; a mão de um homem segura uma garrafa de Absolut Vodka (vidro transparente, letras azuis grandes, texto em script preto, medalhão prateado) que está bem inclinada para baixo, despejando um jato de líquido transparente que está saindo do gargalo e entrando diretamente na boca da mulher."},"roupa":{"blusa":{"tipo":"Regata canelada","caimento":"Justo ao corpo","detalhes":"Tecido amarelo vibrante, com acabamento verde e azul na gola redonda e cavas (cores do Brasil)."},"extra":["Colares dourados muito finos e discretos em camadas, estilo minimalista, sem pingentes.","Óculos de sol pretos clássicos Ray-Ban com texto visível nas lentes ('FUCK' na esquerda, 'off' na direita em letras brancas/douradas).","Calça jeans azul claro visível na parte inferior.","Brincos de argola grandes prateados."]}},"qualidade_da_imagem":{"foco":"Foco cravado no rosto da mulher, no jato de líquido caindo, nos óculos e no rótulo da garrafa de Absolut Vodka.","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online com textura hiper-realista","artefatos_de_sensor":"Queda drástica de luz no fundo causando ruído de imagem típico de celulares à noite.","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS realçando as imperfeições da pele e o texto nas lentes."}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Absolut Vodka', 'Ray-Ban', 'Regata Brasil'],
  },

  // ==========================================
  // POST 74: IMAGEM - INFLUENCER NO ROLÊ NOITE - PUNK ROCK OVERSIZED
  // ==========================================
  {
    id: 'influencer-role-noite-punk-rock-74',
    postNumber: '74',
    title: 'Influencer Underground Punk Jeans Oversized',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img74prompt.webp',
    posterUrl: '/imagensprompt/img74prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Rosto feminino com formato oval, traços típicos de uma jovem brasileira, mandíbula definida, maçãs do rosto marcadas, lábios cheios com gloss rosado, nariz fino. Os olhos estão escondidos por óculos escuros brancos estilo cat-eye com pedrarias na borda superior."],"regras_de_aparencia":{"cabelo_pele":"Cabelo loiro liso repartido ao meio, pele clara com textura irregular altamente realista, poros abertos visíveis, pequenas marcas naturais, sutis manchas de pele humana real, maquiagem visível e brilho natural de oleosidade refletindo o flash nas bochechas e ponta do nariz.","tatuagens_marcas":"Tatuagens finas e desbotadas visíveis nos dedos das mãos."}},"cena":{"local":"Ambiente interno, possivelmente um bar, clube ou espaço industrial/underground.","ambiente":["Parede de madeira escura com textura descascada e fiação aparente","Pilar cilíndrico de metal espesso, enferrujado e desgastado","Dispenser preto fixado na parede ao fundo","Ambiente escuro com aspecto industrial"],"atmosfera":"Noturna, ousada, descontraída, estilo 'night out'."},"iluminacao":{"tipo":"Flash direto de câmera/celular.","luz_principal":"Luz dura e frontal vinda do flash, criando um forte reflexo na pele e roupas, com sombras escuras e bem definidas projetadas diretamente atrás da pessoa e nos objetos do fundo.","luz_de_preenchimento":"Pouca ou nenhuma luz ambiente perceptível; o fundo é escuro e iluminado apenas pelo decaimento rápido da luz do flash.","contraste":"Alto contraste devido ao flash forte contra o ambiente escuro.","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"Foto tirada por outra pessoa de frente, ou câmera posicionada em um tripé/superfície.","angulo":"Frontal, na altura do rosto ou ligeiramente acima.","distancia":"Plano médio, enquadrando da cintura/peito para cima.","visibilidade_do_celular":"O celular não aparece na imagem."},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"Estilosa, rebelde, confiante, atrevida, estética noturna brasileira.","textura_pele":"Pele com textura humana real e irregular, poros bem visíveis nas bochechas e nariz, pequenas marcas naturais de expressão e micro imperfeições, leve oleosidade/brilho natural misturado com a maquiagem sob o flash duro.","expressao":{"olhos":"Escondidos por óculos escuros.","boca":"Lábios projetados para frente em um 'biquinho' (duck face).","emocao":"Atrevida, posando para a foto."},"pose":{"posicao":"De frente para a câmera, corpo levemente inclinado para trás.","apoio":"Parece estar de pé, sem apoio visível.","mao":"Ambos os braços levantados e esticados em direção à câmera, mãos mostrando os dedos médios com os polegares estendidos."},"roupa":{"blusa":{"tipo":"Blusa preta de renda transparente com uma jaqueta jeans oversized sobreposta.","caimento":"Ajustado na parte da renda, com a jaqueta jeans larga e solta por cima.","detalhes":"Jaqueta jeans rústica toda personalizada, coberta de pinturas estilo punk e bordados com nomes de bandas de rock. Possui as palavras 'Rock', 'FUCK', 'Foda-se' e 'é as guria' escritas visivelmente pelo tecido. Por baixo, renda floral translúcida e cinto largo preto estruturado na cintura com pequenas tachas metálicas."},"extra":["Óculos de sol brancos estilo cat-eye com detalhes brilhantes (strass/pedras) na armação","Colar duplo de corrente fina dourada com um pingente de coração escuro","Anel dourado grande no dedo indicador direito, anéis finos na mão esquerda","Pulseira vermelha fina e pulseira de corrente prateada no pulso direito","Brincos de argola fina"]}},"qualidade_da_imagem":{"foco":"Foco cravado no rosto e nas mãos da pessoa, com o fundo ligeiramente fora de foco e engolido pela sombra.","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Sombras duras projetadas pelo flash e granulação nas áreas de sombra do fundo de metal e madeira.","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Punk Rock', 'Jaqueta Jeans', 'Cat-Eye'],
  },

  // ==========================================
  // POST 75: IMAGEM - INFLUENCER NO ROLÊ NOITE - FESTIVAL CHOPP & BLAZER
  // ==========================================
  {
    id: 'influencer-role-noite-festival-blazer-75',
    postNumber: '75',
    title: 'Influencer Festival Show Chopp & Blazer',
    category: 'influencer-no-role-noite',
    categoryLabel: 'Influencer no Rolê Noite',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img75prompt.webp',
    posterUrl: '/imagensprompt/img75prompt.webp',
    prompt: `{"meta":{"aspect_ratio":"9:16","quality":"ultra_photorealistic","resolution":"8k","camera":"câmera frontal do iPhone 15 Pro Max","lens":"24mm grande angular","style":"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível"},"character_lock":{"identity_source":"","face_identity":["Mulher jovem brasileira com rosto oval, maxilar bem delineado, nariz reto e fino, lábios com brilho/gloss rosado, dentes brancos e alinhados visíveis em um sorriso largo, sobrancelhas levemente arqueadas e preenchidas, maquiagem com iluminador pronunciado, olhos amendoados"],"regras_de_aparencia":{"cabelo_pele_textura":"Cabelo muito longo, ondulado, volumoso e castanho claro/ruivo iluminado; tom de pele bronzeado com brilho corporal/iluminador no colo; pele do rosto com textura irregular realista, poros bem aparentes sob a luz do flash, pequenas marcas naturais e assimetrias típicas de uma pele humana verdadeira"}},"cena":{"local":"Festa noturna, show ou festival de música","ambiente":["Pessoas desfocadas no fundo (multidão)","Luzes de palco azuis e roxas com efeito bokeh","Ambiente noturno, escuro e agitado"],"atmosfera":"Energética, festiva, eufórica, noturna"},"iluminacao":{"tipo":"Luz artificial de evento com flash direto","luz_principal":"Flash intenso vindo da frente e ligeiramente de cima, revelando texturas e poros reais da pele, iluminando fortemente o rosto, o colo e o copo levantado","luz_de_preenchimento":"Luzes azuis e roxas do ambiente de show preenchendo o fundo escuro","contraste":"Alto contraste entre a pessoa fortemente iluminada no primeiro plano e o fundo escuro e colorido","evitar":["iluminação de estúdio","ring light artificial","aparência profissional","tons quentes/laranja","flash estourado"]},"perspectiva_da_camera":{"pov":"Foto tirada por terceiros (terceira pessoa), nível do peito/rosto","angulo":"Frontal, com leve inclinação de baixo para cima","distancia":"Plano médio curto (da cintura/peito para cima)","visibilidade_do_celular":"O celular não aparece na imagem"},"assunto":{"genero":"Feminino","idade":"20 anos","vibe":"Descontraída, festeira, glamourosa de festival, beleza brasileira autêntica","textura_pele":"Pele com poros visíveis e abertos pelo suor/maquiagem, textura irregular, pequenas marcas naturais de expressão e micro manchas, leve oleosidade natural de festa visível refletindo o flash","expressao":{"olhos":"Fechados/espremidos devido à risada intensa, olhando para baixo","boca":"Aberta em uma grande gargalhada, lábios esticados, dentes à mostra","emocao":"Alegria extrema, diversão"},"pose":{"posicao":"Tronco levemente virado para o lado, ombros relaxados em movimento de dança/comemoração","apoio":"Em pé no meio da multidão","mao":"Braço direito erguido segurando um copo de plástico transparente com chopp/cerveja"},"roupa":{"blusa":{"tipo":"Blazer/paletó azul claro estilo alfaiataria usado fechado, sem blusa por baixo, decote em V profundo","caimento":"Justo e estruturado","detalhes":"Tecido fosco, botão central metálico escuro, costuras visíveis"},"extra":["Colar dourado fino com pingente quadrado contendo a letra 'C'","Múltiplas pulseiras coloridas de acesso a camarote/festival no pulso direito"]}},"qualidade_da_imagem":{"foco":"Foco principal cravado no rosto da pessoa revelando as microtexturas da pele, fundo completamente em desfoque (bokeh)","granulacao":"ruído visível em baixa luminosidade","nitidez":"NÃO extremamente nítida, mais lo-fi","realismo":"parece uma selfie real de iPhone postada online","artefatos_de_sensor":"Cores de fundo estouradas pelas luzes do palco, bordas do cabelo mesclando levemente com o fundo","distorcao_de_lente":"barrel distortion leve de 24mm, esticando levemente as bordas","pos_processamento":"nitidez artificial (oversharpening) típica de algoritmo iOS"}}`,
    negativePrompt:
      'blurry, distorted, bad hands, extra fingers, cartoon, plastic, watermark, text overlay, low resolution, oversaturated, deformed body, iluminação de estúdio, ring light artificial, aparência profissional, tons quentes/laranja, flash estourado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Influencer', 'Rolê Noite', 'Festival Show', 'Blazer Azul', 'Gargalhada'],
  },

  // ==========================================
  // POST 76: IMAGEM - CARRO NA CENA - DONUTS NO GALPÃO ABANDONADO
  // ==========================================
  {
    id: 'carro-na-cena-donuts-galpao-76',
    postNumber: '76',
    title: 'Donuts no Galpão Abandonado com Grafites',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img76prompt.webp',
    posterUrl: '/imagensprompt/img76prompt.webp',
    prompt: `Use a imagem do veículo anexada como referência absoluta. O carro principal deve ser exatamente o mesmo da foto enviada, mantendo 100% de fidelidade ao modelo original, carroceria, proporções, número correto de portas, faróis, lanternas, grade, para-choques, rodas, pneus, altura, pintura, emblemas e todos os detalhes visuais. Não alterar design, linhas, identidade visual ou qualquer característica estrutural.
Use a imagem de rosto enviada apenas como referência de identidade do personagem, porém o rosto não deve aparecer em nenhum momento na cena.
Cena dentro de um grande galpão abandonado com grafites nas paredes, ambiente industrial urbano, chão de concreto com diversas marcas circulares de pneus queimados.
O veículo da imagem anexada está fazendo donuts no centro do galpão, girando agressivamente e deixando marcas circulares bem visíveis no concreto. Fumaça densa saindo dos pneus traseiros, espalhando-se pelo ambiente com atmosfera cinematográfica e haze industrial.
O personagem principal aparece de costas para a câmera, sentado sobre a moldura da janela do passageiro enquanto o carro gira. O corpo parcialmente para fora do veículo, segurando um smartphone como se estivesse gravando a cena. Nenhuma parte do rosto visível, enquadramento estratégico impedindo qualquer visualização facial.
Ao redor do círculo principal, compondo o cenário automotivo:
Laranja Toyota Supra
Azul Nissan Skyline R34
Amarelo BMW M4
Multidão ao redor filmando com celulares, porém apenas UMA pessoa em primeiro plano claramente visível segurando um telefone em destaque.
Iluminação dramática vinda de luminárias industriais no teto, feixes de luz cortando a fumaça, sombras fortes no concreto, reflexos realistas e fiéis na lataria do veículo principal conforme a imagem original.
Capturado como se fosse com iPhone 17 Pro, lente 1x (sem distorção wide), perspectiva natural, sem exagero de campo de visão.
Ultra alta resolução, texturas extremamente nítidas, reflexos automotivos realistas, motion blur apenas nas rodas em movimento, carroceria perfeitamente nítida, estilo fotografia profissional cinematográfica de street racing.
Negativo: não mostrar o rosto do personagem, não alterar o modelo do veículo da imagem, não modificar número de portas, não trocar rodas, não mudar cor, não deformar proporções, não adicionar body kit diferente do original, não estilizar excessivamente.`,
    negativePrompt:
      'não mostrar o rosto do personagem, não alterar o modelo do veículo da imagem, não modificar número de portas, não trocar rodas, não mudar cor, não deformar proporções, não adicionar body kit diferente do original, não estilizar excessivamente',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Galpão Abandonado', 'Donuts', 'Street Racing'],
  },

  // ==========================================
  // POST 77: IMAGEM - CARRO NA CENA - GOLDEN HOUR SUNRISE
  // ==========================================
  {
    id: 'carro-na-cena-golden-hour-sunrise-77',
    postNumber: '77',
    title: 'Fotografia Automotiva Golden Hour Sunrise',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img77prompt.webp',
    posterUrl: '/imagensprompt/img77prompt.webp',
    prompt: `Ultra-realistic cinematic automotive photography in 8K resolution using the exact vehicle from the uploaded reference image, preserving 100% of its original design, body shape, proportions, paint color, wheels, number of doors, trim details, badges and all structural characteristics with absolute fidelity.The vehicle must be professionally lowered with a realistic reduced suspension height. Decreased ground clearance, wheels positioned closer to the fenders, tight wheel gap, natural camber consistent with a professionally lowered street car. No exaggerated stance. No deformed tires. No unrealistic wheel angles. Maintain correct geometry and structural realism.Maintain the exact vehicle position and orientation as seen in the uploaded image.Scene set at golden hour sunrise. The car is parked on an asphalt road at the top of a hill overlooking a small city in the distance. The sun is low on the horizon to the left side of the frame, casting warm golden-orange light across the entire scene. Strong natural sunlight creates long shadows and a cinematic diagonal lens flare crossing the image from the sun toward the lower foreground.Full side profile view of the vehicle, entire body visible in frame. Medium camera distance. Slightly low camera angle for a dramatic cinematic presence.Foreground: dark asphalt road with subtle texture and faint road markings visible.Midground: the lowered vehicle in sharp focus, ultra-detailed, crisp reflections on paint and windows.Background: distant houses, trees, soft hills fading into atmospheric haze.Sky: dramatic gradient from deep blue at the top to warm orange near the horizon, scattered thin clouds illuminated by sunrise light. Natural atmospheric perspective.Lighting: natural golden hour sunlight only. Realistic highlights and shadows. Balanced exposure between sky and car. Cinematic contrast. No artificial lighting.Photography style: professional DSLR, ultra-detailed, high dynamic range, sharp focus, natural depth of field, cinematic color grading.Mood: calm, peaceful sunrise atmosphere.Strict requirements:Use exactly the vehicle from the uploaded reference image.Maintain 100% body fidelity.Do not change number of doors.Do not modify original body design.Only alter suspension height realistically.No extra cars.No people.No unrealistic proportions.No distortion.No fantasy elements.No exaggerated camber.No stretched tires.Ultra-realistic, cinematic, professional automotive photography.`,
    negativePrompt:
      'No extra cars, no people, unrealistic proportions, distortion, fantasy elements, exaggerated camber, stretched tires, deformed wheels, altered body design, different car model',
    recommendedModel: 'Midjourney v6.1 / Flux.1 Dev',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Golden Hour', 'Automotive Photography', 'Rebaixado'],
  },

  // ==========================================
  // POST 78: IMAGEM - CARRO NA CENA - STUDIO SOFTBOX INDUSTRIAL
  // ==========================================
  {
    id: 'carro-na-cena-studio-softbox-78',
    postNumber: '78',
    title: 'Estúdio Industrial com Softbox Superior',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img78prompt.webp',
    posterUrl: '/imagensprompt/img78prompt.webp',
    prompt: `Ultra-realistic 8K professional automotive studio photography using the exact vehicle from the uploaded reference image, with 100% absolute fidelity to the original car — preserving identical model, body shape, proportions, paint color, materials, wheels, doors, mirrors, headlights, taillights, glass, badges, trim details and overall structure, with no alterations, redesigns, exaggerations or reinterpretations of any kind.
The vehicle is positioned inside a large, dark, empty industrial studio or warehouse, featuring a rough, realistic concrete floor with subtle surface imperfections, micro-cracks, dust, and soft natural reflections. There are no visible walls or background; the environment dissolves smoothly into complete darkness, creating vast negative space.
A single large rectangular softbox ceiling light is suspended above the scene and clearly visible in frame, emitting soft, diffused white light straight downward. This light forms a focused circular pool of illumination on the concrete floor directly beneath the car, while all surrounding areas gradually fade into deep black shadows.
Subtle cinematic volumetric lighting, with fine haze or suspended dust particles in the air, makes the light beam visible without overpowering the scene. The lighting softly illuminates the top surfaces of the vehicle, while the sides and lower areas fall into shadow, creating a dramatic silhouette and strong contrast.
The car is perfectly centered under the light, stationary, surrounded by darkness and negative space.
Low camera angle, slightly offset from the side and rear, emphasizing presence, stance, proportions, and depth. Cinematic framing, balanced composition, minimalism, and high-end commercial aesthetic.
Extreme realism, physically accurate lighting, realistic shadows, precise reflections, high dynamic range, sharp focus, professional studio exposure, moody atmosphere, premium automotive product photography, cinematic tone, ultra-detailed textures, no motion blur.
Prompt negativo (recomendado):
Do not change the vehicle model, body type, number of doors, wheels, paint color, proportions, stance, ride height, mirrors, headlights, taillights, windows, or any structural detail.
No extra lights, no colored lighting, no neon, no environment details, no background objects, no people, no text, no logos added, no reflections of walls, no distortion, no cartoon style, no CGI look, no overexposure, no blur, no grain, no noise, no stylization, no fantasy elements`,
    negativePrompt:
      'Do not change the vehicle model, body type, number of doors, wheels, paint color, proportions, stance, ride height, mirrors, headlights, taillights, windows, or any structural detail. No extra lights, no colored lighting, no neon, no environment details, no background objects, no people, no text, no logos added, no reflections of walls, no distortion, no cartoon style, no CGI look, no overexposure, no blur, no grain, no noise, no stylization, no fantasy elements',
    recommendedModel: 'Midjourney v6.1 / Flux.1 Dev',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Estúdio Automotivo', 'Softbox', 'Moody Studio'],
  },

  // ==========================================
  // POST 79: IMAGEM - CARRO NA CENA - NOTURNO VIA LÁCTEA
  // ==========================================
  {
    id: 'carro-na-cena-noturno-via-lactea-79',
    postNumber: '79',
    title: 'Noturno Cinematográfico com Via Láctea',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img79prompt.webp',
    posterUrl: '/imagensprompt/img79prompt.webp',
    prompt: `Use exatamente o veículo da imagem anexada como referência visual principal.
Preserve 100% da fidelidade absoluta ao carro original da imagem: modelo real, formato da carroceria, proporções, linhas, superfícies, número exato de portas, lanternas, rodas, pintura e todos os detalhes visuais, sem qualquer modificação estrutural.
Carro rebaixado de forma realista e profissional, com suspensão baixa coerente, menor distância do solo, rodas naturalmente mais próximas dos para-lamas, stance esportivo real, sem exageros ou deformações.
Cena noturna cinematográfica hiper-realista, visão frontal  câmera baixa e levemente afastada, destacando a largura do carro e criando sensação de presença e força. Lanternas acesas, com brilho intenso e realista, refletindo no asfalto molhado.
Estrada aberta, vazia e isolada à noite, solo úmido e reflexivo, horizonte distante.
Céu noturno espetacular com Via Láctea visível, estrelas densas e profundas, atmosfera cósmica realista e contemplativa, sem elementos irreais.
Iluminação noturna fria contrastando com a luz fria das lanternas Reflexos fisicamente corretos na pintura, vidros e asfalto. Sombras suaves e realistas. Texturas ultra-detalhadas de metal, vidro e pavimento, com poros da pintura visíveis, micro-detalhes reais, reflexos em camadas e volume físico convincente.
Estética de fotografia automotiva noturna cinematográfica e astrofotografia realista.
Profundidade de campo cinematográfica, foco preciso, nitidez extrema, hiper-realismo 8K, sem textos, sem logos, sem marcas d’água.
PROMPT NEGATIVO
não alterar o veículo da imagem
não trocar o modelo do carro
não mudar o número de portas
não adicionar ou remover peças
não criar aerofólios inexistentes
não deformar a carroceria
não stance extremo ou irreal
não rodas flutuando
não rodas tortas
não reflexos falsos
não pintura plástica
não aparência de CGI
não estilo cartoon
não ilustração
não anime
não arte digital
não blur excessivo
não ruído artificial
não distorção de perspectiva
não mudar a cor original
não duplicar partes do carro
não texto
não logotipo
não watermark`,
    negativePrompt:
      'não alterar o veículo da imagem, não trocar o modelo do carro, não mudar o número de portas, não adicionar ou remover peças, não criar aerofólios inexistentes, não deformar a carroceria, não stance extremo ou irreal, não rodas flutuando, não rodas tortas, não reflexos falsos, não pintura plástica, não aparência de CGI, não estilo cartoon, não ilustração, não anime, não arte digital, não blur excessivo, não ruído artificial, não distorção de perspectiva, não mudar a cor original, não duplicar partes do carro, não texto, não logotipo, não watermark',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Via Láctea', 'Astrofotografia', 'Noturno'],
  },

  // ==========================================
  // POST 80: IMAGEM - CARRO NA CENA - LAGO VOXEL MINECRAFT
  // ==========================================
  {
    id: 'carro-na-cena-lago-voxel-80',
    postNumber: '80',
    title: 'Lago Voxel em Floresta Minecraft Golden Hour',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img80prompt.webp',
    posterUrl: '/imagensprompt/img80prompt.webp',
    prompt: `Veículo exatamente igual ao da imagem fornecida, mantendo 100% de fidelidade absoluta ao modelo original, incluindo formato da carroceria, proporções, número correto de portas, pintura, rodas, materiais, acabamento e todos os detalhes estruturais, sem qualquer alteração ou reinterpretação.
O veículo apresenta suspensão rebaixada de forma realista e profissional, com menor distância do solo, rodas mais próximas aos para-lamas, stance equilibrado, alinhamento e cambagem naturais e coerentes, sem deformações, distorções ou exageros visuais.
O veículo está estacionado em um lago raso e altamente reflexivo dentro de uma floresta vibrante em estilo Minecraft / voxel, cercado por grama pixelada alta, flores voxel coloridas e árvores blocadas densas e exuberantes.
Iluminação de golden hour atravessando as folhas cúbicas, com raios de luz volumétricos suaves, criando uma atmosfera mágica e onírica.
A água rasa gera ondulações realistas, refletindo com precisão o veículo rebaixado e a vegetação voxel ao redor.
Pintura com reflexos ultra-detalhados, brilho realista e interação física correta com a luz do ambiente.
Mistura equilibrada de iluminação fotorrealista com geometria estilizada voxel, mantendo coerência visual.
Composição cinematográfica com câmera em ângulo baixo, veículo centralizado, primeiro plano com água rasa, profundidade de campo cinematográfica, fundo com bokeh suave.
Estilo ultra-realista, 8K, ultra nítido, aparência de Unreal Engine + Octane Render, ray tracing, superfícies glossy, alto contraste, tons quentes de pôr do sol, clima de floresta mágica e fantasia cinematográfica.
prompt negativo
veículo diferente do da imagem fornecida,
modelo incorreto, proporções erradas, escala incorreta,
menos ou mais portas que o original, portas extras ou ausentes,
carroceria deformada, alongada, achatada ou distorcida,
rodas flutuando, rodas atravessando o chão, rodas desalinhadas,
suspensão extrema ou irreal, carro colado no chão, suspensão quebrada,
cambagem exagerada, stance irreal, pneus deformados, pneus esticados demais,
eixos tortos, geometria mecânica incorreta,
alteração de pintura, cor errada, textura errada, acabamento plástico,
reflexos borrados, reflexos irreais, brilho excessivo, aparência de brinquedo,
baixa resolução, imagem borrada, falta de nitidez, ruído, artefatos,
iluminação plana, iluminação estourada, sombras duras irreais,
ray tracing falso, sombras inconsistentes,
estilo cartoon no veículo, aparência de desenho animado,
mistura de estilos incoerente, veículo voxelizado ou pixelado,
vegetação realista demais quebrando o estilo voxel,
vegetação borrada, vegetação duplicada,
água sólida, água sem reflexo, reflexos quebrados, ondulações irreais,
perspectiva errada, câmera torta, enquadramento desequilibrado,
fundo poluído, elementos duplicados, objetos flutuando,
texto, logotipos, marcas d’água, assinatura,
people, personagens, animais,
motion blur excessivo, ghosting,
render amador, aparência de IA, low quality, low poly no veículo`,
    negativePrompt:
      'veículo diferente do da imagem fornecida, modelo incorreto, proporções erradas, menos ou mais portas que o original, carroceria deformada, rodas flutuando, suspensão extrema ou irreal, cambagem exagerada, alteração de pintura, acabamento plástico, reflexos borrados, baixa resolução, imagem borrada, estilo cartoon no veículo, veículo voxelizado ou pixelado, água sólida sem reflexo, texto, logotipos, marcas d’água, people, personagens, render amador',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Voxel Style', 'Minecraft Forest', 'Golden Hour'],
  },

  // ==========================================
  // POST 81: IMAGEM - CARRO NA CENA - DUNAS COSTEIRAS
  // ==========================================
  {
    id: 'carro-na-cena-dunas-costeiras-81',
    postNumber: '81',
    title: 'Dunas Costeiras com Câmera Criativa Semi-Aérea',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img81prompt.webp',
    posterUrl: '/imagensprompt/img81prompt.webp',
    prompt: `Ultra-realistic cinematic view of the vehicle from the attached image, maintaining 100% absolute fidelity to the original model, body shape, design, proportions, paint, and the exact original number of doors. The car is lowered, with a realistic low suspension and natural sporty stance, positioned on a coastal sand dune, surrounded by sparse beach vegetation.
The scene is captured from a creative semi-aerial angle, with the camera placed slightly behind a broken wooden fence. In the foreground, windblown grass and vegetation appear blurred, creating strong depth of field and a cinematic feel.
Deep blue sky with soft white clouds, strong natural midday lighting, intense sunlight casting well-defined shadows on the ground and the car body. Vibrant natural colors, high contrast, realistic reflections on the paint, polished surfaces, extremely detailed textures of sand, wood, and vegetation. Automotive cinematic photography, professional look, extreme realism, 8K quality, sharp focus on the vehicle, no distortions.
Negative Prompt
Change the vehicle model
Add or remove doors (the number of doors must be exactly the same as the original image)
Extra doors, missing doors, duplicated doors
Alter door shape, handles, or body lines
 Convert into coupe, sedan, hatchback, SUV, or any different vehicle type
 Change wheels, headlights, taillights, mirrors, or body panels
Modify paint color, texture, or finish
 Structural distortions, warped or asymmetrical car
Unrealistic proportions, stretched or compressed vehicle
Low resolution, cartoon style, CGI, 3D render look
Unrealistic reflections or excessive artificial lighting
Excessive blur on the vehicle
Bad cutouts, artifacts, glitches, duplications
Incorrect or invented logos
 People, animals, or unwanted extra objects
 Text, watermarks, signatures`,
    negativePrompt:
      'Change the vehicle model, Add or remove doors, Extra doors, missing doors, duplicated doors, Alter door shape, handles, or body lines, Convert into coupe, sedan, hatchback, SUV, Change wheels, headlights, taillights, mirrors, Modify paint color, Structural distortions, Unrealistic proportions, Low resolution, cartoon style, CGI, 3D render look, Unrealistic reflections, Excessive blur, Bad cutouts, artifacts, glitches, Incorrect or invented logos, People, animals, Text, watermarks, signatures',
    recommendedModel: 'Midjourney v6.1 / Flux.1 Dev',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Dunas Costeiras', 'Automotive Photography', 'Rebaixado'],
  },

  // ==========================================
  // POST 82: IMAGEM - CARRO NA CENA - RÚSSIA ANOS 90
  // ==========================================
  {
    id: 'carro-na-cena-russia-anos-90-82',
    postNumber: '82',
    title: 'Estética Filme Anos 90 em São Petersburgo',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img82prompt.webp',
    posterUrl: '/imagensprompt/img82prompt.webp',
    prompt: `Aesthetic of a 1990s movie set in Russia, preserving 100% of the original vehicle’s shape, proportions, color, materials, and details, with lowered suspension, reduced ground clearance, wheels closer to the fenders, and realistic camber and stance consistent with a professionally lowered vehicle (no deformation or distortion). The vehicle is parked near a river in St. Petersburg. Cinematic atmosphere with light snowfall, winter daylight, cold tones, and an urban backdrop featuring Soviet-era architecture. Natural film grain, realistic shadows, soft depth of field, dramatic yet natural lighting, ultra-photorealistic, high detail, Canon AE-1 film look, realistic perspective, 16:9 aspect ratio.
Negative Prompt
extreme camber, broken suspension, unrealistic stance, monster truck height, lifted vehicle, distorted wheels, warped body, altered vehicle model, cartoon, CGI, 3D render, illustration, fantasy style, futuristic elements, incorrect reflections, exaggerated snow, blur, low resolution, plastic textures, unrealistic lighting`,
    negativePrompt:
      'extreme camber, broken suspension, unrealistic stance, monster truck height, lifted vehicle, distorted wheels, warped body, altered vehicle model, cartoon, CGI, 3D render, illustration, fantasy style, futuristic elements, incorrect reflections, exaggerated snow, blur, low resolution, plastic textures, unrealistic lighting',
    recommendedModel: 'Midjourney v6.1 / Flux.1 Dev',
    aspectRatio: '16:9',
    tags: ['Carro Na Cena', 'Exclusivo', '90s Movie', 'St. Petersburg', 'Canon AE-1'],
  },

  // ==========================================
  // POST 83: IMAGEM - CARRO NA CENA - ALPINO NEVADO
  // ==========================================
  {
    id: 'carro-na-cena-alpino-nevado-83',
    postNumber: '83',
    title: 'Cenário Alpino Nevado ao Pôr do Sol',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img83prompt.webp',
    posterUrl: '/imagensprompt/img83prompt.webp',
    prompt: `Cena ultra fotorrealista em 8K, fotografia automotiva cinematográfica ao pôr do sol em um cenário alpino nevado.O veículo da imagem enviada está estacionado em uma estrada de asfalto levemente molhada, refletindo a luz quente do entardecer.O cenário apresenta montanhas altas cobertas de neve ao fundo, com picos bem definidos e textura realista, iluminados por luz dourada e laranja do pôr do sol. O céu possui nuvens densas e dramáticas, com tons intensos de vermelho, laranja e rosa, criando um contraste forte com o branco da neve.À esquerda da composição, árvores altas de pinheiro parcialmente cobertas de neve, adicionando profundidade e escala à cena. O chão ao redor da estrada tem neve acumulada nas bordas, com pequenas poças d’água refletindo o carro e o céu.O veículo apresenta postura esportiva, perfeitamente integrado ao ambiente, com reflexos realistas do céu, das montanhas e da neve na lataria e nos vidros.A iluminação é natural, de golden hour, com luz lateral suave, sombras longas e contraste equilibrado, realçando curvas, volumes e detalhes do carro.Estilo de fotografia:– fotografia automotiva profissional– lente 35mm– profundidade de campo realista– foco extremamente nítido no veículo– leve desfoque atmosférico no fundo– cores cinematográficas– alto alcance dinâmico (HDR natural)Texturas extremamente detalhadas:– neve realista– asfalto úmido com reflexos sutis– pintura automotiva com acabamento perfeito– vidros com reflexos precisos– iluminação fisicamente corretaAtmosfera limpa, fria e cinematográfica, sem pessoas, sem elementos extras, sem distrações.O veículo da imagem enviada possui suspensão rebaixada esportiva, com altura mínima em relação ao solo, mantendo geometria realista e funcional.O vão entre pneus e para-lamas é extremamente reduzido, com alinhamento preciso e natural, sem deformações.A postura do carro transmite estilo stance limpo e realista, com: – centro de gravidade baixo– para-choque dianteiro próximo ao asfalto, sem tocar– soleiras laterais alinhadas à altura da estrada– rodas perfeitamente encaixadas nos arcos– leve cambagem realista (se presente no veículo original), sem exageros irreaisO contato dos pneus com o asfalto é fisicamente correto, sem flutuação ou penetração no solo.Sombras sob o carro são mais densas e próximas, reforçando a sensação de peso e proximidade com o chão.Reflexos no asfalto molhado enfatizam a altura baixa do veículo, criando espelhamento próximo às rodas e ao para-choque.
Prompt negativo Não suspensão altaNão efeito monster truckNão rodas flutuandoNão pneus atravessando o asfaltoNão cambagem extrema estilo cartoonNão scraping exageradoNão distorção de perspectivaNão erro de escalaNão alterar o veículo enviadoNão mudar modelo, rodas ou proporçõesNão adicionar logotipos, marcas d’água ou textosNão estilo cartoon, ilustração ou pinturaNão aparência de render 3DNão distorções, deformações ou erros anatômicosNão excesso de nitidez artificialNão ruído, granulação exagerada ou baixa resoluçãoNão reflexos irreais
Imagem ultra realista, nível fotografia profissional, com mesma iluminação, clima e cenário da imagem de referência, trocando somente o veículo pelo da foto enviada.
Carro claramente rebaixado, agressivo e elegante, 100% realista, integrado ao cenário alpino ao pôr do sol, mantendo iluminação cinematográfica, reflexos naturais e fidelidade total ao veículo enviado.`,
    negativePrompt:
      'Não suspensão alta, Não efeito monster truck, Não rodas flutuando, Não pneus atravessando o asfalto, Não cambagem extrema estilo cartoon, Não scraping exagerado, Não distorção de perspectiva, Não erro de escala, Não alterar o veículo enviado, Não mudar modelo, rodas ou proporções, Não adicionar logotipos, marcas d’água ou textos, Não estilo cartoon, ilustração ou pintura, Não aparência de render 3D, Não distorções, Não reflexos irreais',
    recommendedModel: 'Midjourney v6.1 / Flux.1 Dev',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Alpino Nevado', 'Pôr do Sol', 'Stance'],
  },

  // ==========================================
  // POST 84: IMAGEM - CARRO NA CENA - VIADUTO CONCRETO
  // ==========================================
  {
    id: 'carro-na-cena-viaduto-concreto-84',
    postNumber: '84',
    title: 'Sob Viaduto de Concreto Urbano no Pôr do Sol',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img84prompt.webp',
    posterUrl: '/imagensprompt/img84prompt.webp',
    prompt: `Use a imagem do veículo enviada como referência absoluta.
Substitua o carro da cena pelo veículo da foto fornecida, mantendo 100% da fidelidade do design original do veículo, sem alterar linhas, proporções, rodas ou identidade visual.
O veículo deve estar claramente rebaixado, com altura mínima entre a carroceria e o solo, visual stance agressivo e realista.
Suspensão esportiva ajustada, rodas muito próximas dos para-lamas, preenchendo completamente o arco das rodas, sem espaço excessivo.
Cambagem sutil e realista (não extrema), alinhamento correto, pneus com leve perfil esportivo, contato perfeito com o asfalto molhado.
Cena urbana cinematográfica ultra realista em 8K, fotografia automotiva profissional.
O carro está estacionado sob um viaduto de concreto, ambiente urbano abandonado, pilares grandes com grafites detalhados ao fundo. E um grafite no pilar da ponte com uma logo da marca Volkswagen
Asfalto molhado com poças, criando reflexo espelhado realista do veículo, reflexos coerentes com a iluminação.
Iluminação de golden hour no pôr do sol, luz quente lateral vindo do fundo da cena, contraste alto, sombras longas e naturais.
Faróis acesos, emitindo luz quente refletida no chão molhado.
Enquadramento low angle, perspectiva cinematográfica, profundidade de campo natural, fundo levemente desfocado.
Texturas ultra detalhadas do concreto, água, asfalto e metal, aparência de fotografia DSLR profissional.
Manter exatamente o mesmo enquadramento, iluminação, reflexos, sombras e cenário da imagem de referência.
Alterar somente o veículo, utilizando exclusivamente a imagem enviada como base.
Nenhuma modificação criativa no ambiente.
Prompt negativos
Evitar aparência de render 3D, CGI, arte digital, pintura, cartoon, distorções no carro, reflexos irreais, iluminação artificial exagerada, desfoque excessivo, alterações no design do veículo, mudança de cenário, pessoas, texto ou logotipos extras.`,
    negativePrompt:
      'Evitar aparência de render 3D, CGI, arte digital, pintura, cartoon, distorções no carro, reflexos irreais, iluminação artificial exagerada, desfoque excessivo, alterações no design do veículo, mudança de cenário, pessoas, texto ou logotipos extras',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '1:1',
    tags: ['Carro Na Cena', 'Exclusivo', 'Viaduto Urbano', 'Grafite', 'Golden Hour'],
  },

  // ==========================================
  // POST 85: IMAGEM - CARRO NA CENA - DISTRITO ASIÁTICO NEON CHUVA
  // ==========================================
  {
    id: 'carro-na-cena-distrito-asiatico-neon-85',
    postNumber: '85',
    title: 'Distrito Asiático Noturno com Neon e Chuva',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img85prompt.webp',
    posterUrl: '/imagensprompt/img85prompt.webp',
    prompt: `Fotografia ultra-realista em 8K, usando exatamente o veículo da imagem enviada como referência, mantendo 100% da fidelidade do carro original: proporções reais, pintura, rodas, altura, detalhes físicos e identidade visual sem alterações.
O veículo está parado em uma rua urbana estreita estilo distrito asiático, com prédios altos próximos, fachadas comerciais, placas verticais com letreiros neon coloridos em japonês/coreano, fios elétricos aparentes, postes e elementos urbanos densos.
Ambiente noturno chuvoso, asfalto molhado com poças d’água refletindo luzes neon em tons de verde, rosa, vermelho e azul. Reflexos altamente detalhados no chão, na lataria e nos vidros do carro.
Iluminação: iluminação cinematográfica noturna com múltiplas fontes de neon laterais e superiores, criando reflexos coloridos realistas na pintura do carro. Luz difusa da chuva, contraste alto, sombras suaves, brilho controlado, sem aparência artificial. Sem aparecia anime.
Clima: chuva leve a moderada, gotas visíveis no capô, para-brisa e laterais do carro, micro gotículas refletindo o neon. Atmosfera úmida e densa, leve névoa urbana ao fundo.
Câmera: ângulo baixo frontal (low angle), enquadramento cinematográfico, lente 35mm realista, profundidade de campo rasa, fundo levemente desfocado com bokeh urbano real.
Estilo visual: fotografia automotiva cinematográfica, estética cyberpunk realista, aparência de cena capturada por câmera profissional em filme noturno, sem visual de render 3D.
Qualidade: hiper-realismo, texturas extremas, pintura com micro reflexos reais, pneus com contato físico correto no asfalto molhado, sombras coerentes com cada fonte de luz.
Paleta de cores definida: predominância de neon verde esmeralda e neon magenta/rosa, com leves acentos em azul profundo.
Os letreiros neon verdes atuam como luz principal lateral, refletindo diretamente na lataria, vidros e poças no asfalto.
Luzes magenta/rosa secundárias vindas de fachadas opostas e placas verticais, criando contraste cromático cinematográfico nas sombras e superfícies molhadas.
Reflexos bem definidos porém naturais, sem bloom excessivo, sem cores estouradas, mantendo textura real da pintura do veículo.
Asfalto molhado reflete as cores verdes e magentas com distorções realistas nas poças d’água.
O fundo mantém tons frios e escuros (preto, azul petróleo, cinza grafite), destacando o carro como ponto focal.
Atmosfera noturna densa, com leve névoa urbana capturando a luz neon de forma suave e realista.
O veículo está rebaixado, com suspensão esportiva realista, altura baixa em relação ao solo molhado, pneus próximos aos para-lamas, sem deformações irreais. Contato físico perfeito entre pneus e asfalto, com reflexos contínuos sob o carro.
Priorizar equilíbrio cromático cinematográfico, mantendo realismo fotográfico absoluto e evitando qualquer aparência de arte digital.
Prompt negativos
cartoon, anime, ilustração, pintura, arte digital, CGI, render 3D, videogame, baixa resolução, carro flutuando, reflexos irreais, neon exagerado, luz estourada, proporções erradas, rodas tortas, sombra inconsistente, fake HDR, plástico, unreal engine look
neon exagerado, bloom excessivo, cores estouradas, saturação artificial, visual synthwave, estética vaporwave, luz irreal, fake cyberpunk`,
    negativePrompt:
      'cartoon, anime, ilustração, pintura, arte digital, CGI, render 3D, videogame, baixa resolução, carro flutuando, reflexos irreais, neon exagerado, luz estourada, proporções erradas, rodas tortas, sombra inconsistente, fake HDR, plástico, unreal engine look, bloom excessivo, cores estouradas, saturação artificial, visual synthwave, estética vaporwave, luz irreal, fake cyberpunk',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Distrito Asiático', 'Cyberpunk', 'Neon Noturno'],
  },

  // ==========================================
  // POST 86: IMAGEM - CARRO NA CENA - PRAIA URBANA COM COQUEIROS
  // ==========================================
  {
    id: 'carro-na-cena-praia-urbana-86',
    postNumber: '86',
    title: 'Praia Urbana Ensolarada com Coqueiros',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img86prompt.webp',
    posterUrl: '/imagensprompt/img86prompt.webp',
    prompt: `Fotografia ultra-realista em 8K de um veículo usando exatamente o carro da imagem enviada como referência, mantendo 100% da fidelidade do veículo original, proporções, pintura, rodas, altura e detalhes reais.
O carro está estacionado sobre areia compactada em uma praia urbana, com marcas de pneus visíveis no chão, textura realista da areia, pequenos sulcos e irregularidades naturais.
Cenário: praia ensolarada com coqueiros altos distribuídos ao fundo, guarda-sóis de praia, pessoas sentadas e caminhando de forma natural, fundo levemente desfocado com profundidade de campo realista (bokeh suave). Água do mar visível ao fundo com reflexos suaves da luz do sol.
Iluminação: luz natural diurna, sol alto levemente lateral, criando sombras suaves e realistas sob o carro e nos coqueiros. Alto alcance dinâmico (HDR natural), reflexos realistas na lataria, brilho suave no verniz sem exagero.
Câmera: lente 35mm realista, ângulo baixo levemente frontal (3/4), perspectiva natural de fotografia automotiva profissional.
Estilo: fotografia automotiva lifestyle, aparência de foto real capturada por câmera profissional, cores naturais, contraste equilibrado, sem aparência de render 3D.
Qualidade: ultra-fotorealismo, texturas extremamente detalhadas, pintura com micro-reflexos reais, pneus com desgaste natural, sombras coerentes com a luz ambiente.
Atmosfera: clima de verão, céu azul limpo com poucas nuvens, sensação de dia quente e tranquilo em praia brasileira. Sombras de arvores sobre o carro e areia.  Arvores mais reais detalhadas
O veículo está fortemente rebaixado, com suspensão esportiva ajustada, altura extremamente baixa em relação ao solo, pneus muito próximos aos para-lamas sem atravessar a lataria.
As rodas estão perfeitamente alinhadas, com cambagem leve e realista, sem deformações irreais. O carro acompanha a inclinação natural da areia, mantendo contato real com o chão.
A saia lateral, para-choque dianteiro e traseiro estão muito próximos do solo, com sombras curtas e coerentes projetadas diretamente na areia.
Os pneus apresentam leve compressão devido ao peso do veículo sobre a areia, criando marcas reais no chão.
Altura típica de carro rebaixado estilo OEM+ / stance limpo, sem exageros de show car, mantendo aparência de veículo funcional e real.
Priorizar realismo físico absoluto da suspensão e contato com o solo, evitando qualquer estética de carro de exposição irreal.
Prompt negativos
cartoon, ilustração, render 3D, CGI, arte digital, pintura, exagero de nitidez, reflexos irreais, carro flutuando, deformações, rodas tortas, proporções erradas, sombras inconsistentes, iluminação artificial, cenário genérico, baixa resolução, aparência fake, estilo videogame, plástico, blur excessivo
suspensão quebrada, rodas atravessando para-lama, cambagem extrema, pneus esticados irreais, carro flutuando, sombra desconectada do solo, stance exagerado, estética de render 3D`,
    negativePrompt:
      'cartoon, ilustração, render 3D, CGI, arte digital, pintura, exagero de nitidez, reflexos irreais, carro flutuando, deformações, rodas tortas, proporções erradas, sombras inconsistentes, iluminação artificial, cenário genérico, baixa resolução, aparência fake, estilo videogame, plástico, blur excessivo, suspensão quebrada, rodas atravessando para-lama, cambagem extrema, pneus esticados irreais, stance exagerado',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Praia Urbana', 'Stance', 'Verão'],
  },

  // ==========================================
  // POST 87: IMAGEM - CARRO NA CENA - ABANDONADO EM FLORESTA
  // ==========================================
  {
    id: 'carro-na-cena-floresta-abandonado-87',
    postNumber: '87',
    title: 'Abandonado em Floresta Densa com Musgo',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img87prompt.webp',
    posterUrl: '/imagensprompt/img87prompt.webp',
    prompt: `Crie uma imagem ultra-realista em 8K, com aparência fotográfica cinematográfica, utilizando EXATAMENTE o veículo da imagem de referência enviada, sem alterar design, proporções, identidade, formato, rodas ou características originais do veículo.
O veículo deve estar abandonado em meio a uma floresta densa e úmida, parcialmente coberto por musgo, folhas, galhos e vegetação natural, como se estivesse no local há muitos anos. A vegetação cresce sobre a carroceria, teto, para-lamas e ao redor do carro de forma orgânica e realista, respeitando a gravidade e o contato físico com o veículo.
O cenário é uma floresta fechada, com árvores altas, troncos grossos, raízes aparentes, folhas grandes no primeiro plano e fundo escuro natural. O chão é coberto por folhas secas, terra úmida e pequenas plantas, criando profundidade e sensação de abandono real.
A iluminação é natural e difusa, com luz suave filtrada pelas copas das árvores, criando sombras macias, contraste baixo e atmosfera úmida e melancólica. Não há luz solar direta forte; a luz é espalhada, suave e realista, típica de floresta fechada.
A paleta de cores é natural e terrosa, com verdes profundos, marrons, tons de musgo e oxidação leve no veículo. A pintura do carro apresenta desgaste realista: sujeira acumulada, manchas de umidade, oxidação sutil, sem exageros artificiais.
A câmera está posicionada em ângulo levemente baixo e frontal-lateral, próxima ao chão, com folhas desfocadas em primeiro plano criando profundidade. Profundidade de campo rasa, foco extremamente nítido no veículo e desfoque suave no fundo.
Texturas extremamente detalhadas: metal envelhecido, pintura desgastada, borracha dos pneus suja, vidro opaco com marcas do tempo, musgo com aparência orgânica real, folhas com variação de cor e imperfeições naturais.
Atmosfera cinematográfica realista, estética de fotografia documental, sensação de tempo, abandono e natureza retomando o espaço humano.
Ultra realismo absoluto, aparência de fotografia real, sem CGI, sem render 3D, sem arte digital ou ilustração.Qualidade máxima, iluminação física realista, composição natural e cinematográfica.
Não gerar estilo cartoon, anime, pintura digital ou ilustração.Não criar aparência de CGI, render 3D, Unreal Engine, Octane ou Blender.
Não alterar o design, proporções ou identidade do veículo da imagem de referência.Não misturar modelos ou criar carro genérico.
Não exagerar na oxidação, ferrugem extrema ou destruição irreal.Não criar vegetação flutuante ou musgo artificial sem contato físico.
Não usar iluminação dura ou luz solar direta intensa.Não criar clima dramático artificial ou cores saturadas demais.
Não transformar o cenário em selva fantasiosa ou ambiente pós-apocalíptico exagerado.Não adicionar neblina artificial pesada ou fumaça irreal.
Não adicionar pessoas, animais, construções modernas ou objetos fora de contexto.Não inserir textos, placas, logos falsos ou marcas distorcidas.
Não criar aparência de miniatura, diorama ou escala errada.Não perder o realismo fotográfico natural.`,
    negativePrompt:
      'cartoon, anime, pintura digital, ilustração, CGI, render 3D, Unreal Engine, Octane, Blender, alterar o design do veículo, misturar modelos, ferrugem extrema exagerada, vegetação flutuante, iluminação dura, luz solar direta intensa, cores saturadas demais, selva fantasiosa, ambiente pós-apocalíptico exagerado, neblina artificial pesada, pessoas, animais, construções modernas, textos, logos falsos, miniatura, diorama',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Floresta Densa', 'Carro Abandonado', 'Documental'],
  },

  // ==========================================
  // POST 88: IMAGEM - CARRO NA CENA - GARAGEM CYBERPUNK UNDERGROUND
  // ==========================================
  {
    id: 'carro-na-cena-garagem-cyberpunk-88',
    postNumber: '88',
    title: 'Garagem Industrial Underground com Leds e Neon',
    category: 'carro-na-cena',
    categoryLabel: 'Carro Na Cena',
    mediaType: 'image',
    mediaUrl: '/imagensprompt/img88prompt.webp',
    posterUrl: '/imagensprompt/img88prompt.webp',
    prompt: `Crie uma imagem ultra-realista em 8K, com aparência fotográfica cinematográfica, utilizando EXATAMENTE o veículo da imagem de referência enviada, preservando 100% do design, identidade e características originais do carro.
O veículo deve aparecer rebaixado de forma realista (suspensão esportiva funcional), com altura baixa em relação ao solo, mantendo dirigibilidade plausível. As rodas ficam próximas aos para-lamas, sem deformações, sem inclinação exagerada, sem camber extremo e sem aparência de stance irreal.
O carro está estacionado dentro de uma garagem industrial fechada,  teto metálico, abertura no telhado com entrada suave de luz, paredes desgastadas, peças e ferramentas penduradas, atmosfera de oficina premium estilo need for speed underground.
Iluminação neon estilo cyberpunk integrada ao ambiente de forma realista: luzes neon em tons de roxo, azul ciano e magenta posicionadas lateralmente, no fundo da garagem e próximas ao chão. Os neons criam reflexos físicos naturais na lataria, rodas e piso molhado, sem exagero visual.
O chão é de concreto escuro molhado, com poças d’água realistas refletindo o veículo, as luzes neon e os faróis, com imperfeições, sujeira leve e textura física real. Com folhagens pequenas espalhadas que o vento trouxe.
Os faróis do veículo estão desligados.
Câmera em ângulo baixo (low angle shot), levemente frontal e lateral, enfatizando a largura, a proximidade do carro com o chão e a presença agressiva do rebaixamento. Profundidade de campo rasa, foco extremamente nítido no veículo, fundo suavemente desfocado com bokeh das luzes neon.
Textura da pintura extremamente detalhada, com micro-reflexos, reflexos coloridos dos neons, verniz automotivo realista, sensação física de metal e acabamento premium.
Atmosfera cyberpunk automotiva premium, fotografia profissional noturna, estilo editorial, visual de campanha automotiva realista.
Mude o teto do salão.  Quero um teto com forro em grades com leds quadrados   .  E retire as roupas penduradas e as ferramentas em paredes mude para rodas fe carros e peças
Ultra realismo absoluto, aparência de fotografia real, sem CGI, sem render 3D, sem arte digital.
Qualidade máxima, iluminação física realista, cores profundas e contraste cinematográfico.
Prompt negativos
Não criar stance extremo, camber exagerado, rodas tortas ou pneus esticados irreais.
Não gerar suspensão impossível ou veículo colado no chão de forma antinatural.
Não alterar rodas, pneus ou offset originais do veículo da imagem de referência.
Não misturar estilos (drift, show car, lowrider hidráulico).
Não gerar CGI, render 3D, Unreal Engine, Octane, Blender ou aparência sintética.
Não criar estilo cartoon, anime ou ilustração.
Não exagerar glow neon, reflexos artificiais ou cores estouradas.
Não transformar a garagem em cenário futurista irreal ou rua cyberpunk externa.
Não deformar o veículo, não criar partes flutuantes ou desalinhadas.
Não perder escala, proporção ou realismo físico.
Não adicionar pessoas, reflexos humanos, textos ilegíveis ou logos falsos.
Não criar aparência de brinquedo ou miniatura.
Não remover o piso de concreto molhado nem os reflexos naturais.
Não usar iluminação plana ou sem contraste.`,
    negativePrompt:
      'stance extremo, camber exagerado, rodas tortas, pneus esticados irreais, suspensão impossível, veículo colado no chão antinatural, alterar rodas originais, misturar estilos, CGI, render 3D, Unreal Engine, Octane, Blender, cartoon, anime, ilustração, exagerar glow neon, reflexos artificiais, cores estouradas, cenário futurista irreal, pessoas, textos ilegíveis, logos falsos, brinquedo, miniatura, iluminação plana',
    recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
    aspectRatio: '9:16',
    tags: ['Carro Na Cena', 'Exclusivo', 'Garagem Industrial', 'Need for Speed', 'Neon'],
  },
];

