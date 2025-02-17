using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server.Constants
{
    public class Enum
    {
        public enum MediaType
        {
            IMAGE,
            VIDEO
        }
         public enum ShareType
        {
            [JsonPropertyName("GLOBAL")]
            GLOBAL,
            
            [JsonPropertyName("RESTRICTED")]
            RESTRICTED, 
            
            [JsonPropertyName("PRIVATE")]
            PRIVATE
        }
    }
}