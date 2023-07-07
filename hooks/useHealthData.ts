import { Platform, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";
import { Permission } from 'react-native-health-connect/lib/typescript/types';

const useHealthData = (date: Date) => {
  const [androidPermissions, setAndroidPermissions] = useState<Permission[]>([]);

  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  // const readSampleData = async () => {
  //   // initialize the client
  //   const isInitialized = await initialize();
  //   if (!isInitialized) {
  //     return;
  //   }

  //   // request permissions
  //   await requestPermission([
  //     { accessType: "read", recordType: "Steps" },
  //     { accessType: "read", recordType: "Distance" },
  //     { accessType: "read", recordType: "FloorsClimbed" },
  //   ]);

  //   const timeRangeFilter: TimeRangeFilter = {
  //     operator: "between",
  //     startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
  //     endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
  //   };

  //   // Steps
  //   const steps = await readRecords("Steps", { timeRangeFilter });
  //   const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
  //   setSteps(totalSteps);

  //   // Distance
  //   const distance = await readRecords("Distance", { timeRangeFilter });
  //   const totalDistance = distance.reduce(
  //     (sum, cur) => sum + cur.distance.inMeters,
  //     0
  //   );
  //   setDistance(totalDistance);

  //   // Floors climbed
  //   const floorsClimbed = await readRecords("FloorsClimbed", {
  //     timeRangeFilter,
  //   });
  //   const totalFloors = floorsClimbed.reduce((sum, cur) => sum + cur.floors, 0);
  //   setFlights(totalFloors);
  //   // console.log(floorsClimbed);
  // };

  const hasAndroidPermission = (recordType: string) => {
    return androidPermissions.some((perm) => perm.recordType === recordType);
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    if (!hasAndroidPermission('Steps')) {
      return;
    }
    const getHealthData = async () => {
      const today = new Date();
      const timeRangeFilter: TimeRangeFilter = {
        operator: 'between',
        startTime: new Date(today.getTime() - 86400000).toISOString(),
        endTime: today.toISOString(),
      };

      // Steps
      const steps = await readRecords('Steps', { timeRangeFilter });
      const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
      setSteps(totalSteps);

      // Distance
      const distance = await readRecords('Distance', { timeRangeFilter });
      const totalDistance = distance.reduce(
        (sum, cur) => sum + cur.distance.inMeters,
        0
      );
      setDistance(totalDistance);

      // Floors climbed
      const floorsClimbed = await readRecords('FloorsClimbed', {
        timeRangeFilter,
      });
      const totalFloors = floorsClimbed.reduce(
        (sum, cur) => sum + cur.floors,
        0
      );
      setFlights(totalFloors);
    };

    getHealthData();

    const init = async () => {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.log('Failed to initialize Health Connect');
        return;
      }

      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'Distance' },
        { accessType: 'read', recordType: 'FloorsClimbed' },
      ]);

      setAndroidPermissions(grantedPermissions);
    };

    init();
  }, [androidPermissions]);

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;