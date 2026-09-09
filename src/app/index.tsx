// import { useState } from 'react';
// import { StyleSheet, Pressable, View, FlatList, useWindowDimensions } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import { SymbolView } from 'expo-symbols';

// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { BottomTabInset, Spacing } from '@/constants/theme';

// const ADS_DATA = [
//   { id: '1', title: 'SuperKicks Shoes', description: 'Find your perfect pair today!', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop' },
//   { id: '2', title: 'AdPost Premium', description: 'Get more reach with premium advertising.', image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=300&auto=format&fit=crop' },
//   { id: '3', title: 'Tech Gadgets', description: 'Latest gadgets at the best prices.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300&auto=format&fit=crop' },
//   { id: '4', title: 'Fitness App', description: 'Track your daily goals effortlessly.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=300&auto=format&fit=crop' },
//   { id: '5', title: 'Coffee Beans', description: 'Freshly roasted every single day.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=300&auto=format&fit=crop' },
//   { id: '6', title: 'Travel Deal', description: 'Fly to Paris for less this summer.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=300&auto=format&fit=crop' },
//   { id: '7', title: 'Smart Watch', description: 'Your health and fitness on your wrist.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop' },
//   { id: '8', title: 'Camera Gear', description: 'Capture moments perfectly with our gear.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop' },
// ];

// function AdItem({ item, cardHeight }: { item: typeof ADS_DATA[0], cardHeight: number }) {
//   console.log('hiii');
//   const [liked, setLiked] = useState(false);
//   return (
//     <ThemedView style={[styles.card, { height: cardHeight }]} type="backgroundElement">
//       <Image
//         source={{ uri: item.image }}
//         style={styles.image}
//         contentFit="cover"
//       />
//       <View style={styles.cardContent}>
//         <View style={styles.header}>
//           <View style={styles.adBadge}>
//             <ThemedText style={styles.adBadgeText} themeColor="textSecondary">Sponsored</ThemedText>
//           </View>
//           <Pressable onPress={() => setLiked(!liked)} style={styles.likeButton}>
//             <SymbolView 
//               name={liked ? 'heart.fill' : 'heart'} 
//               size={22} 
//               tintColor={liked ? '#ff3b30' : '#8e8e93'} 
//             />
//           </Pressable>
//         </View>

//         <View style={styles.infoContainer}>
//           <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={1}>{item.title}</ThemedText>
//           <ThemedText type="small" themeColor="textSecondary" style={styles.description} numberOfLines={2}>
//             {item.description}
//           </ThemedText>
//         </View>
//       </View>
//     </ThemedView>
//   );
// }

// export default function HomeScreen() {
//   const { height } = useWindowDimensions();
//   const insets = useSafeAreaInsets();
  
//   // Calculate height to fit 4 items on screen
//   const availableHeight = height - insets.top - insets.bottom - BottomTabInset - (Spacing.four * 2);
//   const cardHeight = Math.max(140, (availableHeight - (Spacing.three * 3)) / 4);

//   return (
//     <ThemedView style={styles.container}>
//       <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//         <FlatList 
//           data={ADS_DATA}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => <AdItem item={item} cardHeight={cardHeight} />}
//           contentContainerStyle={styles.listContent}
//           ItemSeparatorComponent={() => <View style={{ height: Spacing.three }} />}
//           showsVerticalScrollIndicator={false}
//         />
//       </SafeAreaView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   listContent: {
//     padding: Spacing.four,
//     paddingBottom: BottomTabInset + Spacing.four,
//   },
//   card: {
//     flexDirection: 'row',
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '35%',
//     height: '100%',
//   },
//   cardContent: {
//     flex: 1,
//     padding: Spacing.three,
//     justifyContent: 'space-between',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   adBadge: {
//     backgroundColor: 'rgba(128,128,128,0.2)',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   adBadgeText: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
//   likeButton: {
//     padding: 2,
//   },
//   infoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     gap: Spacing.half,
//   },
//   title: {
//     fontSize: 15,
//   },
//   description: {
//     fontSize: 12,
//   },
//   installButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   installButtonText: {
//     color: 'white',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handlePostAd = () => {
    if (!title || !price || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const ad = {
      title,
      price,
      description,
    };

    console.log('Ad:', ad);

    Alert.alert('Success', 'Your ad has been posted!');

    setTitle('');
    setPrice('');
    setDescription('');
  };

  let a:number= 10;
  let b: string = '';
  let c: boolean= true;

  let arr: number[] = [];
  arr.push(10,20,40);
  let user : {name: string, age: number} = {
    name: 'Adpost comment',
    age: 30
  };

let tuple : [string,number] = ['30',40];
let studentDefault : undefined = undefined;

console.log('tupple', tuple);
console.log(user);
console.log(arr);
console.log('value of a is', a);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Post Your Ad</Text>

      <Text style={styles.label}>Ad Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. iPhone 15 Pro"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Describe your product..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handlePostAd}
      >
        <Text style={styles.buttonText}>Post Ad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  description: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});