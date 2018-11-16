import db from '../../db';

const tagInternalValue = {
  TECHNICAL: 'technical',
  POWERFULL: 'powerfull',
  FLEXIBILITY: 'flexibility',
  OVERHANG: 'overhang',
  FINGER_STRENGTH: 'finger strength',
  BALANCE: 'balance',
  HEEL_HOOK: 'heel hook',
  ENDURANCE: 'endurance'
}

const resolvers =  {
  Query: {
    route: async (_, args) => {
      const route = await db.getRoute({ _id: args._id });
      return route;
    },
    all_routes: async () => {
      const all_routes = await db.getAllRoutes();
      return all_routes;
    },
    gym: async (_, args) => {
      const gym = await db.getGym({ _id: args._id });
      return gym;
    },
    all_gyms: async () => {
      const all_gyms = await db.getAllGyms();
      return all_gyms;
    },
  },
  Mutation: {
    createRoute: async (root, args) => {
      try {
        const data = {
          name: args.route.name,
          gym_id: args.route.gym_id,
          grade_routesetter: args.route.grade_routesetter,
          img_url: args.route.img_url,
          img_height: args.route.img_height,
          img_width: args.route.img_width,
          svg: args.route.svg,
          svg_color: args.route.svg_color,
          svg_type: args.route.svg_type,
          svg_height: args.route.svg_height,
          svg_width: args.route.svg_width,
          tags: args.route.tags
        };
        const route = await db.createRoute({ data });
        if (route) {
          const response = {
            success: true,
            message: `Route ${route._id} successfully added`
          }
          const result = Object.assign(
            { route }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Route ${data.name} NOT added`
          }
          return response;
        }
      } catch (e) {
        console.error(e, 'ERROR in createRoute Mutation');
      }
    },
    createGym: async (root, args) => {
      try {
        const data = {
          name: args.gym.name,
          img_url: args.gym.img_url,
          lat: args.gym.lat,
          lon: args.gym.lon,
          grade_min: args.gym.grade_min,
          grade_max: args.gym.grade_max,
          routes: args.gym.routes,
          menu: args.gym.menu,
          timetable: args.gym.timetable, 
          facilities: args.gym.facilities
        };
        
        const gym = await db.createGym({ data });
        if (gym) {
          const response = {
            success: true,
            message: `Gym ${gym._id} successfully added`
          }
          const result = Object.assign(
            { gym }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Gym ${data.name} NOT added`
          }
          return response;
        }
      } catch (e) {
        console.error(e, 'ERROR in createGym Mutation');
      }
    },
  },
  Tag: tagInternalValue
}

export default resolvers;
