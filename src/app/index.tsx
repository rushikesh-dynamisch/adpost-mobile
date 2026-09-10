import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

// --- Constants & Types ---
const THEME = {
  colors: {
    background: '#F9F8F4', // Clean off-white paper
    paper: '#F1EFE7', // Slightly darker for preview clipping
    textDark: '#1A1A1A',
    textMuted: '#666666',
    border: '#DEDCD3',
    borderDark: '#1A1A1A',
    accent: '#1A1A1A',
    accentLight: '#FFFFFF',
    error: '#C93B3B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    headline: {
      fontSize: 28,
      fontWeight: '800' as const,
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 18,
      fontWeight: '700' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 13,
      fontWeight: '500' as const,
    },
    serif: {
      fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    }
  }
};

const CATEGORIES = [
  { id: 'jobs', label: 'Jobs', icon: 'briefcase.fill' },
  { id: 'property', label: 'Property', icon: 'house.fill' },
  { id: 'vehicles', label: 'Vehicles', icon: 'car.fill' },
  { id: 'services', label: 'Services', icon: 'wrench.and.screwdriver.fill' },
  { id: 'buy_sell', label: 'Buy & Sell', icon: 'tag.fill' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'travel', label: 'Travel', icon: 'airplane' },
  { id: 'others', label: 'Others', icon: 'ellipsis' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

// --- Main Component ---
export default function PostAdScreen() {
  const insets = useSafeAreaInsets();
  
  const [activeCategory, setActiveCategory] = useState<CategoryId>('jobs');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');

  const MAX_DESC_LENGTH = 300;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: Math.max(insets.top, THEME.spacing.md) }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton}>
            <SymbolView name="chevron.left" size={22} tintColor={THEME.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CLASSIFIEDS</Text>
          <View style={{ width: 22 }} />
        </View>
        <Text style={styles.headerSubtitle}>Post an Advertisement</Text>
        <View style={styles.headerDivider} />
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CATEGORY</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                  onPress={() => setActiveCategory(cat.id)}
                >
                  <SymbolView 
                    name={cat.icon as any} 
                    size={16} 
                    tintColor={isActive ? THEME.colors.accentLight : THEME.colors.textDark} 
                  />
                  <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Form Fields */}
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>HEADLINE *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Experienced React Developer"
              placeholderTextColor={THEME.colors.textMuted}
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>DESCRIPTION *</Text>
              <Text style={styles.charCount}>{description.length}/{MAX_DESC_LENGTH}</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide details about your listing..."
              placeholderTextColor={THEME.colors.textMuted}
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              maxLength={MAX_DESC_LENGTH}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: THEME.spacing.sm }]}>
              <Text style={styles.inputLabel}>LOCATION</Text>
              <TextInput
                style={styles.input}
                placeholder="City, Area"
                placeholderTextColor={THEME.colors.textMuted}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: THEME.spacing.sm }]}>
              <Text style={styles.inputLabel}>PRICE/BUDGET</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. $5,000"
                placeholderTextColor={THEME.colors.textMuted}
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CONTACT INFO</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone or Email"
              placeholderTextColor={THEME.colors.textMuted}
              value={contact}
              onChangeText={setContact}
            />
          </View>
        </View>

        {/* Image Upload Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PHOTO (OPTIONAL)</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <SymbolView name="camera" size={28} tintColor={THEME.colors.textMuted} />
            <Text style={styles.uploadText}>Tap to add a photo</Text>
          </TouchableOpacity>
        </View>

        {/* Live Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LIVE PREVIEW</Text>
          <View style={styles.previewCard}>
            <Text style={[styles.previewCategory, THEME.typography.serif]}>
              {CATEGORIES.find(c => c.id === activeCategory)?.label.toUpperCase() || 'CLASSIFIED'}
            </Text>
            <Text style={[styles.previewTitle, THEME.typography.serif]}>
              {title.trim() ? title : 'Advertisement Headline'}
            </Text>
            <Text style={[styles.previewDesc, THEME.typography.serif]}>
              {description.trim() ? description : 'Your advertisement description will appear here. Ensure it is clear and provides all necessary details to attract the right audience.'}
            </Text>
            
            {(location || price) ? (
              <View style={styles.previewDetails}>
                {location ? <Text style={[styles.previewDetailText, THEME.typography.serif]}>Location: {location}</Text> : null}
                {price ? <Text style={[styles.previewDetailText, THEME.typography.serif]}>Price: {price}</Text> : null}
              </View>
            ) : null}

            <View style={styles.previewFooter}>
              <Text style={[styles.previewContactLabel, THEME.typography.serif]}>CONTACT:</Text>
              <Text style={[styles.previewContactText, THEME.typography.serif]}>
                {contact.trim() ? contact : 'Not provided'}
              </Text>
            </View>
          </View>
        </View>

        {/* Posting Info */}
        <View style={styles.infoSection}>
          <SymbolView name="info.circle" size={16} tintColor={THEME.colors.textMuted} />
          <Text style={styles.infoText}>
            Standard Ad • Free • 30 days visibility in {CATEGORIES.find(c => c.id === activeCategory)?.label}
          </Text>
        </View>

      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, THEME.spacing.md) }]}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Publish Advertisement</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    paddingHorizontal: THEME.spacing.md,
    backgroundColor: THEME.colors.background,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xs,
  },
  backButton: {
    padding: THEME.spacing.xs,
    marginLeft: -THEME.spacing.xs,
  },
  headerTitle: {
    ...THEME.typography.headline,
    color: THEME.colors.textDark,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    ...THEME.typography.caption,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    marginBottom: THEME.spacing.md,
  },
  headerDivider: {
    height: 2,
    backgroundColor: THEME.colors.borderDark,
    width: '100%',
  },
  scrollContent: {
    padding: THEME.spacing.md,
    paddingTop: THEME.spacing.lg,
  },
  section: {
    marginBottom: THEME.spacing.xl,
  },
  sectionLabel: {
    ...THEME.typography.caption,
    color: THEME.colors.textDark,
    marginBottom: THEME.spacing.sm,
    letterSpacing: 1,
  },
  categoryScroll: {
    paddingVertical: THEME.spacing.xs,
    gap: THEME.spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: THEME.colors.borderDark,
    borderRadius: 0, // Sharp corners for editorial look
    backgroundColor: THEME.colors.background,
    gap: THEME.spacing.xs,
  },
  categoryPillActive: {
    backgroundColor: THEME.colors.accent,
  },
  categoryLabel: {
    ...THEME.typography.caption,
    color: THEME.colors.textDark,
    textTransform: 'uppercase',
  },
  categoryLabelActive: {
    color: THEME.colors.accentLight,
  },
  inputGroup: {
    marginBottom: THEME.spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: THEME.spacing.xs,
  },
  inputLabel: {
    ...THEME.typography.caption,
    color: THEME.colors.textDark,
    marginBottom: THEME.spacing.xs,
  },
  charCount: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderBottomColor: THEME.colors.borderDark, // Stronger bottom border
    backgroundColor: THEME.colors.accentLight,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: 12,
    ...THEME.typography.body,
    color: THEME.colors.textDark,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: THEME.colors.textMuted,
    borderStyle: 'dashed',
    borderRadius: 4,
    padding: THEME.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    gap: THEME.spacing.sm,
  },
  uploadText: {
    ...THEME.typography.caption,
    color: THEME.colors.textMuted,
  },
  previewCard: {
    backgroundColor: THEME.colors.paper,
    borderWidth: 1,
    borderColor: THEME.colors.borderDark,
    padding: THEME.spacing.lg,
    borderStyle: 'dashed', // Gives it a cut-out feel
  },
  previewCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    marginBottom: THEME.spacing.xs,
    letterSpacing: 1,
  },
  previewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME.colors.textDark,
    marginBottom: THEME.spacing.sm,
    lineHeight: 28,
  },
  previewDesc: {
    fontSize: 16,
    color: THEME.colors.textDark,
    lineHeight: 24,
    marginBottom: THEME.spacing.md,
  },
  previewDetails: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
    paddingVertical: THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
    gap: 4,
  },
  previewDetailText: {
    fontSize: 14,
    color: THEME.colors.textDark,
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs,
  },
  previewContactLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.colors.textDark,
  },
  previewContactText: {
    fontSize: 15,
    color: THEME.colors.textDark,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: THEME.spacing.xs,
    paddingVertical: THEME.spacing.md,
    borderTopWidth: 1,
    borderColor: THEME.colors.border,
  },
  infoText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.colors.background,
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    borderTopWidth: 1,
    borderColor: THEME.colors.border,
  },
  submitButton: {
    backgroundColor: THEME.colors.accent,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    ...THEME.typography.title,
    color: THEME.colors.accentLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});