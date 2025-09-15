# Sanity Schema Summary

## Project Overview
- **Schema Source**: HIDE-Kanazawa/my-sanity-site
- **Primary Document Type**: `article` (not `post`)
- **Dataset**: `production` (固定)
- **Frontend Mode**: Read-only (no Studio in this repository)

## Document Types

### 1. Article Document (`article`)

**Core Information:**
- **name**: `article`
- **title**: `Article`
- **type**: `document`

**Field Specifications:**

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `textPaste` | `string` | No | - | 記事テキスト一括入力 (ChatGPT生成記事用) |
| `title` | `string` | Yes | Required | 記事タイトル |
| `slug` | `slug` | Yes | Required, max 96 chars | URL slug (auto-generated from title) |
| `lang` | `string` | Yes | Required | 言語 (default: 'ja') |
| `translationOf` | `reference` | No | weak reference to article | 翻訳元記事の参照 |
| `type` | `string` | Yes | Required | 記事種別 (spot/food/transport/hotel/note) |
| `placeName` | `string` | No | - | 場所名 (optional) |
| `prefecture` | `string` | Yes | Required | 都道府県 (47 prefectures) |
| `publishedAt` | `datetime` | Yes | Required | 公開日時 |
| `coverImage` | `image` | No | hotspot: true | カバー画像 |
| `gallery` | `array` | No | max 12 images | ギャラリー画像配列 |
| `content` | `array` | Yes | Required | 記事本文 (Portable Text) |
| `tags` | `array` | No | - | タグ配列 (string[]) |

**Content Field Structure (Portable Text):**
- `block` - 標準テキストブロック
- `image` - 画像ブロック (hotspot対応)
- `affiliate` - アフィリエイトブロック

**Language Options:**
- Supports multiple languages with fallback to core languages: `['fi', 'da', 'sv', 'pl', 'nl']`
- Default language: `ja` (Japanese)

**Article Types:**
- `spot` - スポット
- `food` - 食事
- `transport` - 交通
- `hotel` - ホテル
- `note` - メモ

**Prefecture List:**
47 Japanese prefectures from Hokkaido to Okinawa (hardcoded list)

### 2. Affiliate Object (`affiliate`)

**Core Information:**
- **name**: `affiliate`
- **title**: `Affiliate Block`
- **type**: `object` (embedded in content)

**Field Specifications:**

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `service` | `string` | Yes | Required | Service provider (booking/rakuten/klook) |
| `url` | `url` | Yes | Required, HTTP/HTTPS | アフィリエイトURL |
| `title` | `string` | No | - | 表示タイトル |
| `description` | `text` | No | - | 説明文 |

## Important Notes for MVP

1. **Document Type**: Use `article` instead of `post` in GROQ queries
2. **No Standard Post Schema**: This is a travel blog with custom article schema
3. **Multilingual Support**: Articles have language variants and translation references
4. **Location-Focused**: Prefecture and place name are key fields
5. **Rich Content**: Supports text, images, and affiliate blocks in content
6. **Studio Separation**: Schema management happens in separate repository
7. **Read-Only Frontend**: This MVP only consumes data, doesn't create/edit

## GROQ Query Considerations

- Use `*[_type == "article"]` instead of `*[_type == "post"]`
- Content field contains mixed blocks (text, images, affiliate)
- Cover image: `coverImage.asset->url`
- Gallery images: `gallery[].asset->url`
- Consider filtering by language: `lang == "ja"`
- Consider filtering by type: `type == "spot"`

## Content Structure Notes

The `content` field uses Portable Text with custom blocks:
- Standard text blocks with rich text support
- Image blocks with hotspot functionality
- Custom affiliate blocks for travel bookings

For MVP display, focus on text blocks and images, handle affiliate blocks as simple link components.