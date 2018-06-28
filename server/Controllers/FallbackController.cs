using Microsoft.AspNetCore.Mvc;

namespace Magoria.Server.Controllers
{
    [Route("api")]
    public class FallbackController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "up and running";
        }
    }
}
