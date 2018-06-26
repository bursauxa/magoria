using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace Magoria.Server.Hubs
{
    public static class IApplicationBuilderExtensions {
        public static IApplicationBuilder UseSignalR(this IApplicationBuilder builder)
        {
            Assembly callingAssembly = Assembly.GetCallingAssembly();
            builder.UseSignalR(routes =>
            {
                foreach(KeyValuePair<string, Type> kvp in GetAnnotatedHubs(callingAssembly))
                    routes.MapHubForDynamicType(kvp.Key, kvp.Value);
            });
            return builder;
        }

        private static void MapHubForDynamicType(this HubRouteBuilder builder, string route, Type type)
        {
            typeof(HubRouteBuilder)
                .GetMethod(nameof(HubRouteBuilder.MapHub), new Type[]{ typeof(PathString) })
                .MakeGenericMethod(type)
                .Invoke(builder, new Object[]{ (PathString)route });
        }

        private static IDictionary<string, Type> GetAnnotatedHubs(Assembly assembly)
        {
            IDictionary<string, Type> result = new Dictionary<string, Type>();            
            foreach (Type type in assembly.GetExportedTypes())
                if (typeof(Hub).IsAssignableFrom(type))
                    foreach (Attribute attribute in type.GetCustomAttributes(typeof(HubRouteAttribute), true))
                        try
                        {
                            result.Add(((HubRouteAttribute)attribute).Route, type);
                        }
                        catch (ArgumentException)
                        {
                            throw new HubException("Multiple hubs declared with identical route: " + ((HubRouteAttribute)attribute).Route);
                        }
            return result;
        }
    }
}