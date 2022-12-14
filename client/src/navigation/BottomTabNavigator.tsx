import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import { HeaderBarIcons, TabBarIcon } from "../components";
import { Colors } from "../constants";
import { useColorScheme, useDeleteTodo, useFavorite } from "../hooks";
import {
  HomeScreen,
  ModalAboutScreen,
  TodoListScreen,
  TodoFormScreen,
  NotFoundScreen,
  ViewTodoScreen,
} from "../screens";
import { RootTabParamList, RootTabScreenProps } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();
  const { favoriteStatus, favorite } = useFavorite();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <HeaderBarIcons
              options={[
                {
                  iconName: "info-circle",
                  onPress: () => navigation.navigate("about"),
                },
              ]}
            />
          ),
        })}
      />
      <BottomTab.Group screenOptions={{ headerShown: true }}>
        <BottomTab.Screen
          name="todo-list"
          component={TodoListScreen}
          options={({ navigation }: RootTabScreenProps<"todo-list">) => ({
            title: "Todo list",
            tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
            headerRight: () => (
              <HeaderBarIcons
                options={[
                  {
                    iconName: "plus-circle",
                    onPress: () => navigation.navigate("todo-add"),
                  },
                ]}
              />
            ),
          })}
        />
        <BottomTab.Screen
          name="todo-add"
          children={({ route }) => (
            <TodoFormScreen route={route} mode={"add"} />
          )}
          options={({ navigation }: RootTabScreenProps<"todo-add">) => ({
            title: "Add task",
            tabBarButton: () => null,
            headerRight: () => (
              <HeaderBarIcons
                options={[
                  {
                    iconName: "times-circle",
                    onPress: () => navigation.navigate("todo-list"),
                  },
                ]}
              />
            ),
          })}
        />
      </BottomTab.Group>
      <BottomTab.Screen
        name="todo-edit"
        children={({ route }) => <TodoFormScreen route={route} mode={"edit"} />}
        options={({ navigation }: RootTabScreenProps<"todo-edit">) => ({
          title: "Edit task",
          tabBarButton: () => null,
          headerRight: () => (
            <HeaderBarIcons
              options={[
                {
                  iconName: "arrow-circle-left",
                  onPress: () => navigation.goBack(),
                },
              ]}
            />
          ),
        })}
      />

      <BottomTab.Screen
        name="todo-view"
        component={ViewTodoScreen}
        options={({ navigation, route }: RootTabScreenProps<"todo-view">) => ({
          title: "View task",
          tabBarButton: () => null,
          headerRight: () => (
            <>
              <HeaderBarIcons
                options={[
                  {
                    iconName: favoriteStatus(route.params.id)
                      ? "star"
                      : "star-o",
                    onPress: () => favorite(route.params.id),
                  },
                  {
                    iconName: "edit",
                    onPress: () =>
                      navigation.navigate("todo-edit", { id: route.params.id }),
                  },
                  {
                    iconName: "trash",
                    onPress: () =>
                      useDeleteTodo(route.params.id, undefined, navigation),
                  },
                ]}
              />
            </>
          ),
        })}
      />
      <BottomTab.Screen
        name="about"
        component={ModalAboutScreen}
        options={({ navigation }: RootTabScreenProps<"about">) => ({
          title: "About",
          tabBarButton: () => null,
          headerRight: () => (
            <HeaderBarIcons
              options={[
                {
                  iconName: "times-circle",
                  onPress: () => navigation.goBack(),
                },
              ]}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="notFound"
        component={NotFoundScreen}
        options={{ title: "Page not found :(", tabBarButton: () => null }}
      />
    </BottomTab.Navigator>
  );
};
