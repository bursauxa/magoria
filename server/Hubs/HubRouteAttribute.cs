using System;

namespace Magoria.Server.Hubs
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class HubRouteAttribute : Attribute
    {
        public HubRouteAttribute(string route) {
            Route = route;
        }

        public string Route { get; private set; }
    }
}