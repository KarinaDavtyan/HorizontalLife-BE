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

export default {
  Query: {
    route: async (_, args) => {
      const route = await db.getRoute({ _id: args._id });
      return route;
    },
    all_routes: async () => {
      const all_routes = await db.getAllRoutes();
      return all_routes;
    },
  },
  Mutation: {
    createRoute: async (root, args) => {
      try {
        const data = {
          name: args.route.name,
          grade_routesetter: args.route.grade_routesetter,
          img_url: args.route.img_url,
          svg_color: args.route.svg_color,
          svg_type: args.route.svg_type,
          svg: args.route.svg,
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
          console.log(e, "ERROR createRoute");
        }
      },
    },
    Tag: tagInternalValue
}
