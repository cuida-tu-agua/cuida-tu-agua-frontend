# Guia para crear y conectar una pantalla del Dashboard

Este documento explica como crear una nueva pantalla dentro del dashboard, conectarla con el menu lateral de escritorio y con la barra inferior de movil, y pasarle `props`.

## 1. Recorrido general

La entrada al dashboard ocurre en `src/navigation/AppNavigator.tsx`:

```tsx
<Stack.Screen name="dashboard">
  {({ navigation }) => (
    <DashboardScreen
      onSignOut={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "landing" }],
        });
      }}
    />
  )}
</Stack.Screen>
```

`DashboardScreen` no decide que pantalla interna mostrar. Primero decide que layout usar con `useResponsive()`:

- `width <= 1064`: `BottomTabsLayout`, usado en movil.
- `width > 1064`: `SidebarLayout`, usado en escritorio.

```tsx
return isMobile ? (
  <BottomTabsLayout />
) : (
  <SidebarLayout onSignOut={onSignOut} userName={userName} />
);
```

Despues, cada layout mantiene su propio estado `tab`:

```tsx
const [tab, setTab] = useState("home");
```

Ese estado controla que componente aparece en el area de contenido.

## 2. Crear la pantalla

Por ejemplo, para crear una pantalla de notificaciones, se puede crear:

`src/screens/dashboard/layouts/notifications/NotificationsScreen.tsx`

```tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

import { useTheme } from "@theme/index";
import { createStyles } from "./NotificationsScreen.styles";

type NotificationsScreenProps = {
  userName?: string;
  onOpenNotification?: (notificationId: string) => void;
};

export default function NotificationsScreen({
  userName = "User",
  onOpenNotification,
}: NotificationsScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notificaciones de {userName}</Text>
      <Text onPress={() => onOpenNotification?.("1")}>
        Abrir notificacion de ejemplo
      </Text>
    </SafeAreaView>
  );
}
```

La pantalla recibe dos `props`:

- `userName`: dato opcional con valor por defecto.
- `onOpenNotification`: callback opcional que permite avisar al layout que el usuario selecciono una notificacion.

Los estilos se pueden mantener en un archivo separado:

`src/screens/dashboard/layouts/notifications/NotificationsScreen.styles.ts`

```tsx
import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: "700",
    },
  });
```

La estructura recomendada es la misma que ya usan `HomeScreen`, `ProfileScreen` y `SettingsScreen`: componente, archivo de estilos y, si hace falta, componentes auxiliares en la misma carpeta.

## 3. Agregarla al menu lateral de escritorio

### 3.1 Importar la pantalla

En `src/components/navigation/SidebarLayout.tsx`:

```tsx
import NotificationsScreen from
  "@screens/dashboard/layouts/notifications/NotificationsScreen";
```

### 3.2 Agregar una clave al estado de navegacion

El valor usado por el menu debe ser consistente. Por ejemplo:

```tsx
const [tab, setTab] = useState("home");
```

La nueva pantalla usara el valor `notifications`.

### 3.3 Renderizar la pantalla

Dentro del contenedor de contenido, junto a las otras condiciones:

```tsx
<View style={{ flex: 1, minHeight: 0 }}>
  {tab === "home" && <HomeScreen />}
  {tab === "profile" && <ProfileScreen />}
  {tab === "settings" && <SettingsScreen />}
  {tab === "notifications" && (
    <NotificationsScreen userName={userName} />
  )}
</View>
```

### 3.4 Agregar la opcion al menu

En `src/components/navigation/Sidebar.tsx`, dentro de `navItems`:

```tsx
const navItems = [
  { label: t("drawer.home"), value: "home" },
  { label: t("drawer.profile"), value: "profile" },
  { label: t("drawer.settings"), value: "settings" },
  { label: "Notificaciones", value: "notifications" },
];
```

El menu ya tiene la logica necesaria:

```tsx
onPress={() => onTabChange(item.value)}
```

Y `SidebarLayout` ya cierra el menu despues de seleccionar una opcion:

```tsx
const handleTabChange = (newTab: string) => {
  setTab(newTab);
  closeSidebar();
};
```

Por eso no hay que reemplazar ni eliminar el menu. Solo se agrega un elemento a `navItems` y una condicion de renderizado.

## 4. Agregarla al layout movil

En `src/components/navigation/BottomTabsLayout.tsx`:

### 4.1 Importar la pantalla

```tsx
import NotificationsScreen from
  "@screens/dashboard/layouts/notifications/NotificationsScreen";
```

### 4.2 Renderizarla

```tsx
<View style={{ flex: 1 }}>
  {tab === "home" && <HomeScreen />}
  {tab === "profile" && <ProfileScreen />}
  {tab === "settings" && <SettingsScreen />}
  {tab === "notifications" && <NotificationsScreen />}
</View>
```

### 4.3 Agregar el boton

Dentro de la barra inferior:

```tsx
<TabButton
  label="Notificaciones"
  active={tab === "notifications"}
  onPress={() => setTab("notifications")}
/>
```

La barra inferior sigue existiendo porque solamente cambia el contenido de la vista superior. No se debe colocar el nuevo componente fuera del `View` que contiene el contenido ni reemplazar el `BottomTabsLayout` completo.

## 5. Como pasar `props` desde el layout

Los `props` se pasan como atributos JSX:

```tsx
{tab === "notifications" && (
  <NotificationsScreen
    userName={userName}
    onOpenNotification={(notificationId) => {
      console.log("Notificacion seleccionada:", notificationId);
    }}
  />
)}
```

La pantalla los recibe mediante su tipo y sus parametros:

```tsx
type NotificationsScreenProps = {
  userName: string;
  onOpenNotification: (notificationId: string) => void;
};

export default function NotificationsScreen({
  userName,
  onOpenNotification,
}: NotificationsScreenProps) {
  // usar userName y onOpenNotification aqui
}
```

### Tipos de `props` frecuentes

Callback sin argumentos:

```tsx
type Props = {
  onClose: () => void;
};
```

Callback con un identificador opcional, como en `HomeScreen`:

```tsx
type Props = {
  onOpenStats?: (homeId?: string) => void;
};
```

Dato obligatorio:

```tsx
type Props = {
  homeId: string;
};
```

Dato opcional con valor por defecto:

```tsx
type Props = {
  userName?: string;
};

export default function Screen({ userName = "User" }: Props) {
  // ...
}
```

## 6. Patron para abrir otra vista desde una pantalla

El patron actual de escritorio es que la pantalla hija no modifica directamente el menu. En su lugar, llama un callback del layout.

En `SidebarLayout`:

```tsx
{tab === "home" && (
  <HomeScreen
    onOpenStats={(homeId?: string) => {
      setSelectedHome(homeId);
      setTab("stats");
    }}
  />
)}
```

En `HomeScreen`:

```tsx
onPress={() => {
  onOpenStats?.(item.id);
}}
```

La secuencia es:

```text
Usuario pulsa una tarjeta
  -> HomeScreen llama onOpenStats(id)
  -> SidebarLayout guarda selectedHome
  -> SidebarLayout cambia tab a stats
  -> StatsScreen se renderiza
```

Este patron es util cuando la pantalla destino debe permanecer dentro del mismo layout y conservar el menu o la barra de navegacion.

## 7. Props y datos seleccionados

Guardar un identificador en el layout no basta: tambien hay que pasarlo a la pantalla destino.

Actualmente `SidebarLayout` guarda `selectedHome`, pero `StatsScreen` no lo recibe:

```tsx
const [selectedHome, setSelectedHome] = useState<string | undefined>(undefined);
```

Para que las estadisticas correspondan al hogar seleccionado, el flujo deberia quedar asi:

En `SidebarLayout`:

```tsx
{tab === "stats" && (
  <StatsScreen
    homeId={selectedHome}
    onClose={() => setTab("home")}
  />
)}
```

En `StatsScreen`:

```tsx
type Props = {
  homeId?: string;
  onClose?: () => void;
};

export default function StatsScreen({ homeId, onClose }: Props) {
  // usar homeId para cargar o filtrar las estadisticas
}
```

El mismo principio sirve para cualquier pantalla nueva: el layout posee el estado de navegacion y pasa a la pantalla los datos que esta necesita.

## 8. Cuando usar `tab` y cuando usar React Navigation

Usa el estado `tab` del layout cuando la pantalla debe conservar el marco del dashboard:

- menu lateral de escritorio;
- barra inferior de movil;
- encabezado comun;
- estado compartido del dashboard.

Usa `navigation.navigate("ruta")` cuando debe abrirse una pantalla registrada en `AppNavigator` como una ruta independiente.

Para una nueva pantalla interna del dashboard, el patron mas consistente con el codigo actual es:

1. Crear el componente.
2. Importarlo en `SidebarLayout` y `BottomTabsLayout`.
3. Agregar su valor al menu o a los tabs.
4. Agregar la condicion `tab === "valor"`.
5. Definir y pasar sus `props`.
6. Mantener el menu o la barra fuera del bloque de contenido.

## 9. Lista de comprobacion

- [ ] La pantalla tiene su propio archivo `.tsx`.
- [ ] Tiene un tipo `Props` si recibe informacion o callbacks.
- [ ] Esta importada en el layout que la mostrara.
- [ ] Tiene un valor unico para `tab`, por ejemplo `notifications`.
- [ ] El valor aparece en `Sidebar.tsx` si debe estar en el menu lateral.
- [ ] El valor aparece en `BottomTabsLayout.tsx` si debe estar en la barra movil.
- [ ] Existe una condicion de renderizado para ese valor.
- [ ] Los callbacks se pasan desde el layout hacia la pantalla.
- [ ] Los datos seleccionados se guardan y se pasan a la pantalla destino.
- [ ] El menu o la barra permanecen fuera del contenido condicional.
- [ ] Las claves de traduccion se agregan a los archivos de `src/i18n/translations/` cuando el texto debe ser multidioma.
