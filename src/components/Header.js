import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import GopersonalLogo from "./GoPersonalLogoComplete"

const Header = ({ onUserPress, showBackButton = false, onBackPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Back button or spacer */}
      {showBackButton ? (
        <TouchableOpacity 
          onPress={onBackPress || (() => navigation.goBack())} 
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Centered logo */}
      <GopersonalLogo width={120} height={24} />

      {/* User button */}
      <TouchableOpacity onPress={onUserPress} style={styles.iconButton}>
        <Ionicons name="person-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: 40,
  },
})

export default Header
