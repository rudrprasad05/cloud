using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static server.Constants.Enum;

namespace server.Models.Requests
{
    public class NewShareRequest
    {
        public ShareType ShareType { get; set; } = ShareType.GLOBAL;
    }
}