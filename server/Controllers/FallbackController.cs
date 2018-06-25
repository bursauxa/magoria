using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Magoria.Server.Controllers
{
    [Route("")]
    public class FallbackController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "up and running";
        }
    }
}
