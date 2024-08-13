type Payload = {
    content?: string // Main text content (optional)
    username?: string // Sender's username (optional)
    avatar_url?: string // Sender's avatar URL (optional)
    tts?: boolean // Text-to-Speech (optional)
    allowed_mentions?: {
        users?: boolean // Mention users (optional)
        roles?: boolean // Mention roles (optional)
        everyone?: boolean // Mention everyone (optional)
    }
    embeds?: Array<{
        // An array of embed objects (optional)
        title?: string // Embed title (optional)
        type?: string // Embed type (optional)
        description?: string // Embed description (optional)
        url?: string // URL for the embed (optional)
        timestamp?: string // Timestamp in ISO8601 format (optional)
        color?: number // Hex color code (optional)
        footer?: {
            text?: string // Footer text (optional)
            icon_url?: string // Footer icon URL (optional)
        }
        image?: {
            url?: string // Image URL (optional)
        }
        thumbnail?: {
            url?: string // Thumbnail URL (optional)
        }
        author?: {
            name?: string // Author name (optional)
            url?: string // Author URL (optional)
            icon_url?: string // Author icon URL (optional)
        }
        fields?: Array<{
            // An array of embed fields (optional)
            name: string // Field name
            value: string // Field value
            inline?: boolean // Whether the field should be displayed inline (optional)
        }>
    }>
}

export = Payload
